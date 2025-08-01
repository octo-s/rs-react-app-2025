import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SearchBar Component Tests', () => {
  const mockOnSearch = vi.fn();
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('Rendering: renders search input and search button', () => {
    render(
      <SearchBar onSearch={mockOnSearch} value="" onChange={mockOnChange} />
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('Rendering: renders input with initial value', () => {
    render(
      <SearchBar value="Rick" onSearch={vi.fn()} onChange={mockOnChange} />
    );
    expect(screen.getByTestId('search-input')).toHaveValue('Rick');
  });
});
