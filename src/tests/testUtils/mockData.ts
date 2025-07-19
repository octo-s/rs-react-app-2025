import type {
  Character,
  FetchCharactersResponse,
  Info,
} from '../../api/apiClient.ts';

export const mockRick: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

export const mockMorty: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

export const mockInfo: Info = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

export const mockCharacters: Character[] = [mockRick, mockMorty];

export const mockResponse: FetchCharactersResponse = {
  data: {
    results: mockCharacters,
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
  },
  error: undefined,
};
