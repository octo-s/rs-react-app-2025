import { beforeEach, vi, describe, it, expect } from 'vitest';
import { mockCharacters } from './testUtils/mockData.ts';
import { fetchCharacters } from '../api/apiClient';

describe('API Integration Tests', () => {
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

    const res = await fetchCharacters('Rick');

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

    const res = await fetchCharacters('UnknownName');

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
