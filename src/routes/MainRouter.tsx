import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';
import AuthorizedRoutes from './AuthorizedRoutes.tsx';
import UnauthorizedRoutes from './UnauthorizedRoutes.tsx';

type MainRouterProps = {
  className?: string;
};

const MainRouter: React.FC<MainRouterProps> = () => {
  const [userData] = useLocalStorage('user', '');

  return userData ? (
    <AuthorizedRoutes userData={userData} />
  ) : (
    <UnauthorizedRoutes />
  );
};

export default MainRouter;
