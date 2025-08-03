import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchBar component', () => {
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

  it('User Interaction: calls onSearch when Enter is pressed in input', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onChange = vi.fn();

    render(<SearchBar value="Morty" onChange={onChange} onSearch={onSearch} />);

    const input = screen.getByTestId('search-input');

    await user.type(input, '{enter}');

    expect(onSearch).toHaveBeenCalled();
  });
});
