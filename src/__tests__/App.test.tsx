import { beforeEach, vi, describe, it, expect } from 'vitest';
import App from '../App.tsx';
import ErrorBoundary from '../components/ErrorBoundary';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

import { fetchCharacters } from '../api/apiClient';
import { FIRST_PAGE } from '../__utils__/constants.tsx';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';
import { mockInfo, mockResponse } from '../mocks/responses.ts';
import { mockMorty, mockRick } from '../mocks/ characters.ts';
import type { FetchCharactersResponse } from '../__types__/characters.ts';

const mockedFetchCharacters = fetchCharacters as (
  name?: string
) => Promise<FetchCharactersResponse> as ReturnType<typeof vi.fn>;

function renderApp() {
  renderWithRouter(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

describe('Main App Component Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Integration: Makes initial API call on mount', async () => {
    mockedFetchCharacters.mockResolvedValueOnce(mockResponse);

    renderApp();

    await waitFor(() => {
      expect(mockedFetchCharacters).toHaveBeenCalledWith('', FIRST_PAGE);
    });

    expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
  });

  it('Integration: Manages loading state during API calls', async () => {
    let resolve!: (value: FetchCharactersResponse) => void;

    const fetchPromise = new Promise<FetchCharactersResponse>(
      (promiseResolve) => (resolve = promiseResolve)
    );

    mockedFetchCharacters.mockReturnValue(fetchPromise);

    renderApp();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    resolve(mockResponse);

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    });
  });

  it('State Management: API Integration: Updates component state based on API responses', async () => {
    mockedFetchCharacters.mockResolvedValueOnce({
      data: {
        results: [mockRick],
        info: mockInfo,
      },
      error: undefined,
    });

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    });

    mockedFetchCharacters.mockResolvedValueOnce({
      data: {
        results: [mockMorty],
        info: mockInfo,
      },
      error: undefined,
    });

    const input = screen.getByTestId('search-input');
    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, 'morty');

    await user.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getByText(/Morty Smith/)).toBeInTheDocument();
    });

    expect(screen.queryByText(/Rick Sanchez/)).not.toBeInTheDocument();
  });

  it('State Management: Manages search term state correctly', async () => {
    mockedFetchCharacters.mockResolvedValue({
      data: {
        results: [mockRick],
        info: mockInfo,
      },
      error: undefined,
    });

    const user = userEvent.setup();

    renderApp();

    const input = screen.getByTestId('search-input');
    await user.clear(input);
    await user.type(input, 'rick');
    await user.click(screen.getByTestId('search-button'));
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    });

    expect(localStorage.getItem('searchQuery')).toBe('rick');

    expect(mockedFetchCharacters).toHaveBeenCalledTimes(2);
  });
});
