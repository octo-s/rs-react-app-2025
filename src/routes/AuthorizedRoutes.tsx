import React from 'react';
import { Route, Routes } from 'react-router';
import AboutPage from '../pages/AboutPage.tsx';
import NotFound from '../pages/NotFoundPage.tsx';
import { TEXTS } from '../texts.ts';

type AuthorizedRoutesProps = {
  userData?: string;
};

const AuthorizedRoutes: React.FC<AuthorizedRoutesProps> = ({ userData }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <h1 className="text-2xl font-bold  mb-2">
            {TEXTS.hello}
            {userData}
          </h1>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthorizedRoutes;
