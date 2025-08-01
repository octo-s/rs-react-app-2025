import React from 'react';
import { Link } from 'react-router';
import { TEXTS } from '../texts.ts';
import { ThemeSwitcher } from './ThemeSwitcher.tsx';

const Header: React.FC = () => {
  return (
    <header
      className="w-full py-4 flex justify-around text-center bg-blue-600 text-white rounded relative outline-none border-none dark:bg-gray-700"
      data-testid="header"
    >
      <h1 className="text-2xl font-bold  mb-2">{TEXTS.headerTitle}</h1>
      <Link
        to="/about"
        className="absolute right-6 top-4 inline-block px-6 py-2 bg-white text-blue-700 border-none rounded font-semibold shadow transition-transform transform hover:scale-105 dark:text-red-900"
        data-testid="about-link"
      >
        {TEXTS.aboutLink}
      </Link>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
