import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header component tests', () => {
  it('Rendering: renders the header title', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /rick and morty explorer/i })
    ).toBeInTheDocument();
  });

  it('Rendering: renders inside a header tag', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
