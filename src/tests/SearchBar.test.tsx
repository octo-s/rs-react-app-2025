import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchBar Component Tests', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('Rendering: renders search input and search button', () => {
    render(<SearchBar onSearch={mockOnSearch} initialValue="" />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('Rendering: renders input with initial value', () => {
    render(<SearchBar initialValue="Rick" onSearch={vi.fn()} />);
    expect(screen.getByTestId('search-input')).toHaveValue('Rick');
  });

  it('User Interaction: updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar initialValue="" onSearch={vi.fn()} />);
    const input = screen.getByTestId('search-input');

    await user.type(input, 'Morty');
    expect(input).toHaveValue('Morty');
  });

  it('User Interaction: calls onSearch with trimmed input on search button click', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar initialValue="  Morty  " onSearch={mockOnSearch} />);
    await user.click(screen.getByTestId('search-button'));

    expect(localStorage.getItem('searchQuery')).toBe('Morty');
    expect(mockOnSearch).toHaveBeenCalledWith('Morty');
  });

  it('LocalStorage Integration: saves search query to localStorage on search', async () => {
    const user = userEvent.setup();
    render(<SearchBar initialValue="Summer" onSearch={vi.fn()} />);

    await user.click(screen.getByTestId('search-button'));
    expect(localStorage.getItem('searchQuery')).toBe('Summer');
  });

  it('LocalStorage Integration: overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchQuery', 'Birdperson');
    render(<SearchBar onSearch={mockOnSearch} initialValue="Birdperson" />);
    const input = screen.getByTestId('search-input');

    await userEvent.clear(input);
    await userEvent.type(input, 'Squanchy');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchQuery')).toBe('Squanchy');
  });
});
