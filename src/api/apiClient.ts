export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface FetchCharactersResponse {
  error?: string;
  data: {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  } | null;
}

export async function fetchCharacters(
  name: string = ''
): Promise<FetchCharactersResponse> {
  const params = new URLSearchParams();
  if (name !== '') {
    params.append('name', name);
    params.append('page', '1');
  }
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
