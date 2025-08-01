import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router';
import CharacterDetails from '../pages/CharacterPage';
import * as api from '../api/apiClient';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';
import { mockRick } from '../mocks/ characters.ts';

describe('CharacterPage component __tests__', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Rendering: renders spinner while loading', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockImplementation(
      () => new Promise(() => {})
    );
    renderWithRouter(
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>,
      { route: '/character/1' }
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Rendering: renders character info on success', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue({
      data: mockRick,
      error: undefined,
    });

    renderWithRouter(
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>,
      { route: '/character/1' }
    );

    await waitFor(() => {
      expect(screen.getByText(mockRick.name)).toBeInTheDocument();
    });

    expect(screen.getByText(mockRick.status)).toBeInTheDocument();
    expect(screen.getByText(mockRick.species)).toBeInTheDocument();
    expect(screen.getByAltText(mockRick.name)).toBeInTheDocument();
  });

  it('Rendering: renders error if character is not found', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue({
      data: null,
      error: 'Character not found',
    });

    renderWithRouter(
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>,
      { route: '/character/999' }
    );

    await waitFor(() => {
      expect(screen.getByText(/character not found/i)).toBeInTheDocument();
    });
  });

  it('User Interaction: calls navigate("/") when close button is clicked', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue({
      data: mockRick,
      error: undefined,
    });

    const user = userEvent.setup();
    renderWithRouter(
      <Routes>
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/" element={<div data-testid="home-page" />} />
      </Routes>,
      { route: '/character/1' }
    );

    await waitFor(() => {
      expect(screen.getByText(mockRick.name)).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: /close details/i });
    await user.click(closeBtn);

    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('Rendering: renders type field if character.type is present', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue({
      data: mockRick,
      error: undefined,
    });

    renderWithRouter(<CharacterDetails />);

    await waitFor(() => {
      expect(screen.getByText('Type:')).toBeInTheDocument();
      expect(
        screen.getByText((_, node) => node?.textContent === 'Pickle')
      ).toBeInTheDocument();
      expect(
        screen.getByText((_, node) => node?.textContent === 'Type:')
      ).toBeInTheDocument();
    });
  });
});
