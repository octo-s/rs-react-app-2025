import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import { describe, it, expect } from 'vitest';
import { mockRick } from './testUtils/mockData.ts';

describe('Card component tests', () => {
  it('Rendering: Displays item name and description correctly', () => {
    render(<Card character={mockRick} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human - Alive')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
    expect(img).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('Rendering: Handles missing props gracefully', () => {
    const incompleteCharacter = {
      ...mockRick,
      name: '',
      species: '',
      status: '',
      image: '',
    };

    render(<Card character={incompleteCharacter} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://placehold.co/300x300/png'
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Unknown name');
    expect(screen.getByText(/Unknown name/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Unknown species - Unknown status/i)
    ).toBeInTheDocument();
  });
});
