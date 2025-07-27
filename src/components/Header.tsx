import React from 'react';
import { Link } from 'react-router';
import { TEXTS } from '../texts.ts';

const Header: React.FC = () => {
  return (
    <header
      className="w-full py-4 text-center bg-blue-600 text-white rounded relative"
      data-testid="header"
    >
      <h1 className="text-2xl font-bold  mb-2">{TEXTS.headerTitle}</h1>
      <Link
        to="/about"
        className="absolute right-6 top-4 inline-block px-6 py-2 bg-white text-blue-700 border border-blue-700 rounded font-semibold shadow transition-transform transform hover:scale-105 hover:bg-blue-50 hover:text-blue-800"
        data-testid="about-link"
      >
        {TEXTS.aboutLink}
      </Link>
    </header>
  );
};

export default Header;
