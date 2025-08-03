import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';

export function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
}
