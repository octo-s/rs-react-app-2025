import { beforeEach, vi, describe, it, expect } from 'vitest';
import { fetchCharacterById, fetchCharacters } from '../api/apiClient';
import { FIRST_PAGE } from '../__utils__/constants.ts';
import { mockCharacters, mockRick } from '../mocks/ characters.ts';

describe('API Integration Tests: fetchCharacters', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns data on successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          results: mockCharacters,
        }),
      })
    );

    const res = await fetchCharacters('Rick', 1);

    expect(res.error).toBeUndefined();
    expect(res.data?.results[0].name).toBe('Rick Sanchez');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('name=Rick'));
  });

  it('returns error on 404 Not Found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const res = await fetchCharacters('UnknownName', FIRST_PAGE);

    expect(res.error).toMatch(/404 Not Found/);
    expect(res.data).toBeNull();
  });

  it('returns error on other HTTP errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    const res = await fetchCharacters();

    expect(res.error).toMatch(/500 Internal Server Error/);
    expect(res.data).toBeNull();
  });
});

describe('API Integration Tests: fetchCharacterById', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data on successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRick,
      })
    );

    const res = await fetchCharacterById('1');

    expect(res.error).toBeUndefined();
    expect(res.data?.id).toBe(1);
    expect(res.data?.name).toBe('Rick Sanchez');
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  it('returns error when id is not provided', async () => {
    const res = await fetchCharacterById(undefined);

    expect(res.error).toMatch(/undefined/);
    expect(res.data).toBeNull();
  });

  it('returns error on 404 Not Found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const res = await fetchCharacterById('9999999');
    expect(res.error).toMatch(/404 Not Found/);
    expect(res.data).toBeNull();
  });

  it('returns error on other HTTP errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    const res = await fetchCharacterById('1');
    expect(res.error).toMatch(/500 Internal Server Error/);
    expect(res.data).toBeNull();
  });
});
