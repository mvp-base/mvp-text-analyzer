interface IRow {
  id: number;
  rowText: string;
  entities: any[];
  topics: any[];
  language: string;
}

interface IGlobalTopics {
  label: string;
  count: number;
  wikiLink: string;
}

export interface IDashboardData {
  name: string;
  exportDate: Date;
  globalTopics: IGlobalTopics[];
  rows: IRow[];
}
