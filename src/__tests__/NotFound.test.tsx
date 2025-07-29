import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router';
import NotFound from '../components/NotFoundPage';
import { describe, expect, it } from 'vitest';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';

function Home() {
  return <div data-testid="home-page">Home Page</div>;
}

describe('NotFoundPage component', () => {
  it('renders 404 message and button', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/the page you’re looking for doesn’t exist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /back to home/i })
    ).toBeInTheDocument();
  });

  it('navigates to home page on button click', async () => {
    const user = userEvent.setup();
    renderWithRouter(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { route: '/not-found' }
    );
    expect(screen.getByText('404')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /back to home/i });
    await user.click(button);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
