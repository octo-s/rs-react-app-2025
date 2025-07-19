import { render, screen } from '@testing-library/react';
import Results from '../components/Results';
import { describe, it, expect } from 'vitest';
import { mockCharacters } from './testUtils/mockData.ts';

describe('Results Component Tests', () => {
  it('Rendering: renders correct number of items when data is provided', () => {
    render(
      <Results characters={mockCharacters} loading={false} error={null} />
    );

    const cards = screen.getAllByTestId('character-card');

    expect(cards).toHaveLength(2);
  });

  it('Rendering: renders correct number of items when data is not provided', () => {
    render(<Results characters={[]} loading={false} error={null} />);

    const cards = screen.queryAllByTestId('character-card');

    expect(cards).toHaveLength(0);
  });

  it('Rendering: Shows loading state while fetching data', () => {
    render(<Results characters={[]} loading={true} error={null} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Data Display: handles empty character list gracefully', () => {
    render(<Results characters={[]} loading={false} error={null} />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
  });

  it('Error Handling: displays error message when error prop is present', () => {
    render(<Results characters={[]} loading={false} error="Network Error" />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
  });
});
