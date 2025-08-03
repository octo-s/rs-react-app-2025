import { mockCharacters } from './characters.ts';
import type { FetchCharactersResponse, Info } from '../__types__/characters.ts';

export const mockInfo: Info = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

export const mockResponse: FetchCharactersResponse = {
  data: {
    results: mockCharacters,
    info: mockInfo,
  },
  error: undefined,
};
