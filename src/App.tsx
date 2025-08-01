import React, { useContext } from 'react';
import Header from './components/Header.tsx';
import MainRouter from './routes/MainRouter.tsx';

import { ThemeContext } from './providers/ThemeProvider/ThemeContext.ts';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="w-full max-w-5xl p-4 space-y-4">
          <Header />
          <MainRouter />
        </div>
      </div>
    </div>
  );
};

export default App;
