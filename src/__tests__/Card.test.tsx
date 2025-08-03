import { render, screen, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { LocationDisplay } from './testUtils/LocationDisplay.tsx';
import { mockRick } from '../mocks/characters.ts';
import { UNKNOWN_CHARACTER } from '../__utils__/constants.ts';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Card component', () => {
  it('Rendering: Displays item name and description correctly', () => {
    renderWithRouter(<Card character={mockRick} />);
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

    renderWithRouter(<Card character={incompleteCharacter} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      UNKNOWN_CHARACTER.image
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      UNKNOWN_CHARACTER.name
    );
    expect(screen.getByText(/Unknown name/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Unknown species - Unknown status/i)
    ).toBeInTheDocument();
  });

  it('navigates to /character/:id with current search params on click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=1']}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Card character={mockRick} />
                  <LocationDisplay />
                </>
              }
            />
            <Route path="/character/:id" element={<LocationDisplay />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('location').textContent).toBe('/?page=1');

    await userEvent.click(screen.getByTestId('character-card'));

    await waitFor(() => {
      expect(screen.getByTestId('location').textContent).toBe(
        '/character/1?page=1'
      );
    });
  });
});
