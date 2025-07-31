import type { SearchState } from '../__types__/search.ts';
import type { Character } from '../__types__/characters.ts';

export const FIRST_PAGE = 1;

export const INITIAL_SEARCH_STATE: SearchState = {
  query: '',
  page: FIRST_PAGE,
  loading: false,
  error: null,
  results: [],
  totalPages: 0,
};

export const UNKNOWN_CHARACTER: Partial<Character> = {
  name: 'Unknown name',
  species: 'Unknown species',
  status: 'Unknown status',
  image: 'https://placehold.co/300x300/png',
};
