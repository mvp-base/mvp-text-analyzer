import { addFile } from '../redux/fileMgrSlice';
import { IDashboardData, IWord } from '@/interfaces/global';

const TOP_TOPICS = 4;

interface IResults {
  variant: string;
  text: string;
}

interface Entity {
  confidenceScore: number;
  [key: string]: any;
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

  const fileContent = await readFile(file);
  const plainFileName = file.name.charAt(0)
    .toUpperCase()
    + file.name.slice(1, file.name.lastIndexOf("."))

  const apiKey = process.env.NEXT_PUBLIC_TEXT_RAZOR_API_KEY;
  const url = '/api/textrazor/';
  const headers: HeadersInit = {
    'x-textrazor-key': apiKey || '',
    'Content-Type': 'application/json',
  };
  const data = new URLSearchParams({
    extractors: 'entities,topics,categories,entailments',
    text: fileContent,
  }).toString();

  const dashboardData: IDashboardData = {
    name: plainFileName,
    exportDate: new Date(),
    globalTopics: [],
    topTopics: [],
    detailedTopics: [],
    entities: [],
    sentences: [],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: data,
  });
  console.log('Response received: ', response);


  if (!response.ok) throw new Error(`${response.statusText}`);

  const result = await response.json();

  console.log('Result received: ', result);


  try {
    // Parse Coarse Topics and save global stats
    const { coarseTopics, topics, entities, sentences } = result.response;

    //save coarse topics
    coarseTopics.forEach((topic: any) => {
      const { label, wikiLink, score } = topic;
      const correctWikiLink = wikiLink.slice(0, wikiLink.lastIndexOf("/") + 1) + "wiki/" + wikiLink.slice(wikiLink.lastIndexOf("/") + 1);

      dashboardData.globalTopics.push({
        name: label,
        score: score,
        wikiLink: correctWikiLink,
      });
    });

    //save top 5 most common topics
    topics.slice(0, TOP_TOPICS).forEach((topic: any) => {
      const { label, wikiLink, score } = topic;
      const correctWikiLink = wikiLink.slice(0, wikiLink.lastIndexOf("/") + 1) + "wiki/" + wikiLink.slice(wikiLink.lastIndexOf("/") + 1);

      dashboardData.topTopics.push({
        name: label,
        score: score,
        wikiLink: correctWikiLink,
      });
    });

    //save top 20 most common topics
    topics.slice(TOP_TOPICS, 20).forEach((topic: any) => {
      const { label, wikiLink, score } = topic;
      const correctWikiLink = wikiLink.slice(0, wikiLink.lastIndexOf("/") + 1) + "wiki/" + wikiLink.slice(wikiLink.lastIndexOf("/") + 1);

      dashboardData.detailedTopics.push({
        name: label,
        score: score,
        wikiLink: correctWikiLink,
      });
    });

    //save entities that confidenceScore >= 15
    Object.entries(entities)
      .filter(([key, entity]: [string, any]) => entity.confidenceScore >= 15)
      .forEach((entity: any) => {
        const { confidenceScore, endingPos, relevanceScore, type, wikiLink } = entity[1];
        dashboardData.entities.push({
          confidenceScore: confidenceScore,
          endingPos: endingPos,
          relevanceScore: relevanceScore,
          type: type,
          wikiLink: wikiLink,
        });
      });

    //save sentences
    sentences.forEach((sentence: any) => {
      const words = sentence.words.map((word: any) => {
        const { endingPos, token } = word;
        return (
          {
            token: token,
            endingPos: endingPos
          }
        );
      });
      dashboardData.sentences.push(words);
    });

  } catch (error) {
    return { variant: 'danger', text: 'File import failed.' };
  } finally {
    dispatch(addFile({ filename: file.name, data: dashboardData }));
    return { variant: 'success', text: 'File successfully imported!' };
  }
}
