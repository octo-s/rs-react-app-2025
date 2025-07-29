import React from 'react';
import Header from './components/Header.tsx';
import MainRouter from './routes/MainRouter.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl p-4 space-y-4">
        <Header />
        <MainRouter />
      </div>
    </div>
  );
};

export default App;
