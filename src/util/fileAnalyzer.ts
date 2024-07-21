import { IDashboardData } from '../interfaces/global';
import { addFile } from '../redux/fileMgrSlice';

interface IResults {
  variant: string;
  text: string;
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}

export async function analyzeFile(
  file: File,
  apiKey: string,
  dispatch: any
): Promise<IResults> {
  if (!apiKey) {
    return { variant: 'danger', text: 'There is an issue with the API key.' };
  }

  const dashboardData: IDashboardData = { globalTopics: [], rows: [] };
  const fileContent = await readFile(file);
  const fileRows = fileContent.split('\n');

  const url = '/';
  const promises = fileRows.map(async (row, index) => {
    const data = new URLSearchParams({
      extractors: 'entities,topics',
      text: row,
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-textrazor-key': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (!response.ok) throw new Error(`${response.statusText}`);

      const result = await response.json();

      // Parse Coarse Topics and save global stats
      result.response.coarseTopics.forEach((topic: any) => {
        const { label, wikiLink } = topic;
        const globalTopic = dashboardData.globalTopics.find(
          (stats) => stats.label === label
        );

        if (globalTopic) {
          globalTopic.count++;
        } else {
          dashboardData.globalTopics.push({
            label: label,
            count: 1,
            wikiLink: wikiLink,
          });
        }
      });
      // Filter only 6 most common topics
      dashboardData.globalTopics.sort((a, b) => b.count - a.count);
      dashboardData.globalTopics = dashboardData.globalTopics.slice(0, 6);

      // Save Row data
      dashboardData.rows[index] = {
        id: index,
        rowText: row,
        entities: result.response.entities,
        topics: result.response.topics,
        language: result.response.language,
      };
    } catch (error) {
      return { variant: 'danger', text: 'File import failed.' };
    }
  });

  try {
    await Promise.all(promises);

    dispatch(addFile({ filename: file.name, data: dashboardData }));
    return { variant: 'success', text: 'File successfully imported!' };
  } catch (error) {
    return { variant: 'danger', text: 'File import failed.' };
  }
}
