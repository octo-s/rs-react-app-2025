import React from 'react';

import Header from './Header';
import Search from './Search.tsx';
import { Route, Routes } from 'react-router';
import About from './About.tsx';
import NotFound from './NotFound.tsx';
import CharacterDetails from './CharacterDetails.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl p-4 space-y-4">
        <Header />
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
