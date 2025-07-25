import { render, screen, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { FIRST_PAGE } from '../constants.tsx';
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

import {
  fetchCharacters,
  type FetchCharactersResponse,
} from '../api/apiClient';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

const mockedFetchCharacters = fetchCharacters as (
  name?: string
) => Promise<FetchCharactersResponse> as ReturnType<typeof vi.fn>;

describe('Search Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('User Interaction: updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search />);
    const input = screen.getByTestId('search-input');

    await user.type(input, 'Morty');
    expect(input).toHaveValue('Morty');
  });

  it('LocalStorage Integration: uses searchQuery from localStorage on mount', async () => {
    localStorage.setItem('searchQuery', 'rick');
    render(<Search />);
    expect(screen.getByTestId('search-input')).toHaveValue('rick');
  });

  it('User Interaction: calls onSearch with trimmed input on search button click', async () => {
    const user = userEvent.setup();

    render(<Search />);
    const input = screen.getByTestId('search-input');

    await user.clear(input);
    await user.type(input, '   Morty   ');

    await user.click(screen.getByTestId('search-button'));

    expect(localStorage.getItem('searchQuery')).toBe('Morty');
    expect(mockedFetchCharacters).toHaveBeenLastCalledWith('Morty', FIRST_PAGE);
  });

  it('LocalStorage Integration: saves search query to localStorage on search', async () => {
    render(<Search />);

    const user = userEvent.setup();
    const input = screen.getByTestId('search-input');

    await user.clear(input);
    await user.type(input, 'Summer');
    await user.click(screen.getByTestId('search-button'));

    expect(localStorage.getItem('searchQuery')).toBe('Summer');
  });

  it('LocalStorage Integration: overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchQuery', 'Birdperson');

    render(<Search />);
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

    render(
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
});
