import { useReducer, useCallback } from 'react';
import { fetchCharacters } from '../api/apiClient';
import { FIRST_PAGE } from '../constants.tsx';
import type { Character } from '../types.ts';

type SearchParams = {
  query: string;
  page: number;
};
type SearchState = SearchParams & {
  totalPages: number;
  results: Character[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'setQuery'; payload: SearchParams }
  | { type: 'fetchStart' }
  | {
      type: 'fetchSuccess';
      payload: { results: Character[]; totalPages: number };
    }
  | { type: 'fetchError'; payload: string }
  | { type: 'reset' };

export const INITIAL_STATE: SearchState = {
  query: '',
  page: FIRST_PAGE,
  loading: false,
  error: null,
  results: [],
  totalPages: 0,
};

export function reducer(state: SearchState, action: Action): SearchState {
  switch (action.type) {
    case 'setQuery':
      return {
        ...state,
        query: action.payload.query,
        page: action.payload.page,
      };
    case 'fetchStart':
      return { ...state, loading: true, error: null };
    case 'fetchSuccess':
      return {
        ...state,
        loading: false,
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case 'fetchError':
      return { ...state, loading: false, error: action.payload, results: [] };
    case 'reset':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const useSearch = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const search = useCallback(
    async ({ query, page = FIRST_PAGE }: SearchParams) => {
      dispatch({ type: 'setQuery', payload: { query, page } });
      dispatch({ type: 'fetchStart' });

      const result = (await fetchCharacters(query, page)) || {};
      const { data, error } = result;

      if (data) {
        dispatch({
          type: 'fetchSuccess',
          payload: {
            results: data.results,
            totalPages: data.info.pages,
          },
        });
      }

      if (error) {
        console.error('Error fetching characters:', error);
        dispatch({ type: 'fetchError', payload: error });
      }
    },
    []
  );

  const reset = () => dispatch({ type: 'reset' });

  return {
    ...state,
    search,
    reset,
  };
};
