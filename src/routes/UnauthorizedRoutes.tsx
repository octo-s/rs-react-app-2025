import React from 'react';
import { Route, Routes } from 'react-router';
import Search from '../pages/SearchPage.tsx';
import CharacterPage from '../pages/CharacterPage.tsx';
import AboutPage from '../pages/AboutPage.tsx';
import NotFound from '../pages/NotFoundPage.tsx';

type UnauthorizedRoutesProps = {
  className?: string;
};

const UnauthorizedRoutes: React.FC<UnauthorizedRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />}>
        <Route path="/character/:id" element={<CharacterPage />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UnauthorizedRoutes;
