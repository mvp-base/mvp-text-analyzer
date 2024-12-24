interface IEntity {
  type?: string[];
  relevanceScore: number;
  endingPos: number;
  confidenceScore: number;
  wikiLink: string;
}

export interface IWord {
  endingPos: number;
  token: string;
}

interface IGlobalTopics {
  name: string;
  score: number;
  wikiLink: string;
}

export interface IDashboardData {
  name: string;
  exportDate: Date;
  globalTopics: IGlobalTopics[];
  topTopics: GlobalTopics[];
  detailedTopics: IGlobalTopics[];
  entities: IEntity[];
  sentences: IWord[][];
}
