import type { SearchState } from './search.ts';

export const FIRST_PAGE = 1;

export const INITIAL_SEARCH_STATE: SearchState = {
  query: '',
  page: FIRST_PAGE,
  loading: false,
  error: null,
  results: [],
  totalPages: 0,
};
