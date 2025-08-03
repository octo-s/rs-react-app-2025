import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../pages/SearchPage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';

const setParamsMock = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => ({}),
    useSearchParams: () => [
      { get: (key: string) => (key === 'page' ? '1' : null) },
      setParamsMock,
    ],
  };
});

const mockSearch = vi.fn();
vi.mock('../hooks/useSearch', () => ({
  useSearch: () => ({
    query: 'Rick',
    loading: false,
    error: null,
    results: [],
    totalPages: 2,
    search: mockSearch,
  }),
}));

describe('Pagination component', () => {
  beforeEach(() => {
    setParamsMock.mockClear();
    mockSearch.mockClear();
  });

  it('calls setParams and search on next page click', async () => {
    renderWithRouter(<Search />);
    const nextButton = screen.getByRole('button', { name: '>' });

    await userEvent.click(nextButton);

    expect(setParamsMock).toHaveBeenCalledWith({ page: '2' });
    expect(mockSearch).toHaveBeenCalledWith({ query: 'Rick', page: 2 });
  });
});
