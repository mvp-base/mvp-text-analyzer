import { addFile } from '../redux/fileMgrSlice';
import { IDashboardData } from '@/interfaces/global';

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
  dispatch: any
): Promise<IResults> {

  console.log("Started analyzing [analyzeFile]");

  const apiKey = process.env.NEXT_PUBLIC_TEXT_RAZOR_API_KEY;
  const url = '/api/textrazor/';
  const headers: HeadersInit = {
    'x-textrazor-key': apiKey || '',
    'Content-Type': 'application/json',
  };

  const fileContent = await readFile(file);
  const plainFileName = file.name.charAt(0)
    .toUpperCase()
    + file.name.slice(1, file.name.lastIndexOf("."))

  const dashboardData: IDashboardData = {
    name: plainFileName,
    exportDate: new Date(),
    globalTopics: [],
    rows: []
  };

  const data = new URLSearchParams({
    extractors: 'entities,topics',
    text: fileContent,
  }).toString();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: data,
  });

  if (!response.ok) throw new Error(`${response.statusText}`);

  const result = await response.json();

  try {
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
    // dashboardData.rows[index] = {
    //   id: index,
    //   rowText: row,
    //   entities: result.response.entities,
    //   topics: result.response.topics,
    //   language: result.response.language,
    // };

  } catch (error) {
    return { variant: 'danger', text: 'File import failed.' };
  } finally {
    dispatch(addFile({ filename: file.name, data: dashboardData }));
    return { variant: 'success', text: 'File successfully imported!' };
  }
}
