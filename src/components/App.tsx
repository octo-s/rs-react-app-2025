import React from 'react';

import Header from './Header';
import Search from './Search.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-4 space-y-4">
        <Header />
        <Search />
      </div>
    </div>
  );
};

export default App;
