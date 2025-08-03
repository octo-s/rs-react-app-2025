import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';
import { renderWithRouter } from './testUtils/renderWithRouter.tsx';
import { Routes, Route } from 'react-router';
import About from '../pages/AboutPage';
import userEvent from '@testing-library/user-event';
import Search from '../pages/SearchPage.tsx';

describe('Header component ', () => {
  it('Rendering: renders the header title', () => {
    renderWithRouter(<Header />);
    expect(
      screen.getByRole('heading', { name: /rick and morty explorer/i })
    ).toBeInTheDocument();
  });

  it('Rendering: renders inside a header tag', () => {
    renderWithRouter(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('User Interaction: AboutPage button navigates to the AboutPage page', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    );

    const aboutLink = screen.getByTestId('about-link');
    await user.click(aboutLink);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByText(/about this app/i)).toBeInTheDocument();
  });
});
