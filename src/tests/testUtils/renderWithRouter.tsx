import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

export function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
