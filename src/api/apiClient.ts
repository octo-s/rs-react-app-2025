export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface FetchCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
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

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
