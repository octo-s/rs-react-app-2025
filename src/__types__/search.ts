import type { Character } from './characters.ts';

export type SearchParams = {
  query: string;
  page: number;
};

export type SearchState = SearchParams & {
  totalPages: number;
  results: Character[];
  loading: boolean;
  error: string | null;
};

export type SearchAction =
  | { type: 'setQuery'; payload: SearchParams }
  | { type: 'fetchStart' }
  | {
      type: 'fetchSuccess';
      payload: { results: Character[]; totalPages: number };
    }
  | { type: 'fetchError'; payload: string }
  | { type: 'reset' };
