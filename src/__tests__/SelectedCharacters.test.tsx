import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../entities/selected/selectedSlice';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectedCharacters from '../components/SelectedCharacters';
import { TEXTS } from '../texts';
import { arrayToCSV } from '../__utils__/arrayToCSV';
import { mockCharacters } from '../mocks/characters.ts';
import { describe, expect, it, vi } from 'vitest';
import type { Character } from '../__types__/characters.ts';

vi.mock('../__utils__/arrayToCSV', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    arrayToCSV: vi.fn().mockReturnValue('csv,data'),
  };
});

function renderWithStore(initialSelected: Character[] = []) {
  const store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
    preloadedState: {
      selected: {
        selectedCharacters: initialSelected,
      },
    },
  });
  return render(
    <Provider store={store}>
      <SelectedCharacters />
    </Provider>
  );
}

describe('SelectedCharacters component', () => {
  it('Rendering: does not render when there are no selected characters', () => {
    renderWithStore([]);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('Rendering: renders with correct count', () => {
    renderWithStore(mockCharacters);
    expect(screen.getByText(/2 items selected/i)).toBeInTheDocument();
  });

  it('User Interaction: calls unselectAll action when Unselect all button clicked', () => {
    const store = configureStore({
      reducer: { selected: selectedReducer },
      preloadedState: { selected: { selectedCharacters: mockCharacters } },
    });

    render(
      <Provider store={store}>
        <SelectedCharacters />
      </Provider>
    );

    fireEvent.click(screen.getByText(TEXTS.unselectAll));
    expect(store.getState().selected.selectedCharacters).toHaveLength(0);
  });

  it('User Interaction: sets download link and filename on download click', async () => {
    global.URL.createObjectURL = vi.fn(() => 'blob:mocked-url');

    renderWithStore(mockCharacters);

    await waitFor(() => {
      expect(screen.getByTestId('download-link')).toBeInTheDocument();
    });

    const anchor = screen.getByTestId('download-link');

    fireEvent.click(anchor);

    expect(anchor.getAttribute('download')).toBe('2_items.csv');
    expect(anchor.getAttribute('href')).toContain('blob:');

    expect(arrayToCSV).toHaveBeenCalledWith(mockCharacters);
  });

  it('Rendering: shows and hides based on state', async () => {
    const { rerender } = renderWithStore(mockCharacters);
    expect(screen.queryByText(/items selected/i)).toBeInTheDocument();

    rerender(
      <Provider
        store={configureStore({
          reducer: { selected: selectedReducer },
          preloadedState: { selected: { selectedCharacters: [] } },
        })}
      >
        <SelectedCharacters />
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
      },
      { timeout: 600 }
    );
  });
});
