import { render, screen, waitFor } from '@testing-library/react';
import Search from '../pages/SearchPage';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FIRST_PAGE, INITIAL_SEARCH_STATE } from '../__utils__/constants.tsx';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';
import { reducer } from '../hooks/useSearch.tsx';
import { mockRick } from '../mocks/ characters.ts';
import { fetchCharacters } from '../api/apiClient';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import type { FetchCharactersResponse } from '../__utils__/characters.ts';

vi.mock('../api/apiClient', async () => {
  const actual =
    await vi.importActual<typeof import('../api/apiClient')>(
      '../api/apiClient'
    );

  return {
    ...actual,
    fetchCharacters: vi.fn(),
  };
});

const MOCK_STATE = {
  query: 'Morty',
  page: 3,
  totalPages: 10,
  results: [mockRick],
  loading: true,
  error: 'Some error',
};

const mockedFetchCharacters = fetchCharacters as (
  name?: string
) => Promise<FetchCharactersResponse> as ReturnType<typeof vi.fn>;

describe('SearchPage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();

    mockedFetchCharacters.mockResolvedValue({
      data: {
        results: [],
        info: { pages: 1, count: 0, next: null, prev: null },
      },
      error: null,
    });
  });

  it('User Interaction: updates input value when user types', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Search />);
    const input = screen.getByTestId('search-input');

    await user.type(input, 'Morty');
    expect(input).toHaveValue('Morty');
  });

  it('LocalStorage Integration: uses searchQuery from localStorage on mount', async () => {
    localStorage.setItem('searchQuery', 'rick');
    renderWithRouter(<Search />);
    expect(screen.getByTestId('search-input')).toHaveValue('rick');
  });

  it('User Interaction: calls onSearch with trimmed input on search button click', async () => {
    const user = userEvent.setup();

    renderWithRouter(<Search />);
    const input = screen.getByTestId('search-input');

    await user.clear(input);
    await user.type(input, '   Morty   ');

    await user.click(screen.getByTestId('search-button'));

    expect(localStorage.getItem('searchQuery')).toBe('Morty');
    expect(mockedFetchCharacters).toHaveBeenLastCalledWith('Morty', FIRST_PAGE);
  });

  it('LocalStorage Integration: saves search query to localStorage on search', async () => {
    renderWithRouter(<Search />);

    const user = userEvent.setup();
    const input = screen.getByTestId('search-input');

    await user.clear(input);
    await user.type(input, 'Summer');
    await user.click(screen.getByTestId('search-button'));

    expect(localStorage.getItem('searchQuery')).toBe('Summer');
  });

  it('LocalStorage Integration: overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchQuery', 'Birdperson');

    renderWithRouter(<Search />);
    expect(localStorage.getItem('searchQuery')).toBe('Birdperson');

    const input = screen.getByTestId('search-input');

    await userEvent.clear(input);
    await userEvent.type(input, 'Squanchy');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe('Squanchy');
  });

  it('State Management: handles API error gracefully and sets error state', async () => {
    mockedFetchCharacters.mockResolvedValue({
      data: null,
      error: 'Internal Error',
    });

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    renderWithRouter(
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('not-found')).not.toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching characters:',
      'Internal Error'
    );

    consoleErrorSpy.mockRestore();
  });

  it('Rendering: renders with full width when id is not present', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );
    const resultsBlock = screen.getByTestId('results-block');
    expect(resultsBlock).toHaveClass('w-full');
    expect(resultsBlock).toHaveClass('mr-0');
  });

  it('Rendering: renders with 65% width and margin when id is present', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );
    const resultsBlock = screen.getByTestId('results-block');
    expect(resultsBlock).toHaveClass('w-[65%]');
    expect(resultsBlock).toHaveClass('mr-4');
  });

  it('returns INITIAL_STATE on reset action', () => {
    const result = reducer(MOCK_STATE, { type: 'reset' });
    expect(result).toEqual(INITIAL_SEARCH_STATE);
  });
});
