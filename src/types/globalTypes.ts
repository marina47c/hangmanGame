export type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export type User = {
  name: string;
}

export type HighscoreData = {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}

export type PostHighscoreData = HighscoreData;

export type GetHighscoreData = HighscoreData & {
  id: number;
}

export type TableHightScoreData = HighscoreData & {
  score: number;
}

export enum GameStatusEnum {
  Fail = 'fail',
  Success = 'success',
  Playing = 'playing',
}