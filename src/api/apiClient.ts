import type {
  FetchCharacterResponse,
  FetchCharactersResponse,
} from '../__utils__/characters.ts';

export async function fetchCharacters(
  name: string | undefined = '',
  page: number = 1
): Promise<FetchCharactersResponse> {
  const params = new URLSearchParams();
  if (name !== '') {
    params.append('name', name);
  }
  params.append('page', String(page));

  const url = `https://rickandmortyapi.com/api/character/?${params.toString()}`;
  const response = await fetch(url);

  if (response.status === 404) {
    return {
      error: `${response.status} ${response.statusText} No results found for name ${name}`,
      data: null,
    };
  }

  if (!response.ok) {
    return {
      error: `API error: ${response.status} ${response.statusText}`,
      data: null,
    };
  }

  const data = await response.json();

  return { data };
}

export async function fetchCharacterById(
  id?: string
): Promise<FetchCharacterResponse> {
  if (!id) {
    return {
      error: `Id is undefined`,
      data: null,
    };
  }

  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const response = await fetch(url);

  if (response.status === 404) {
    return {
      error: `${response.status} ${response.statusText} No results found for id ${id}`,
      data: null,
    };
  }

  if (!response.ok) {
    return {
      error: `API error: ${response.status} ${response.statusText}`,
      data: null,
    };
  }

  const data = await response.json();

  return { data };
}
