import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      className="w-full py-4 text-center bg-blue-600 text-white rounded"
      data-testid="header"
    >
      <h1 className="text-2xl font-bold">Rick and Morty Explorer</h1>
    </header>
  );
};

export default Header;
