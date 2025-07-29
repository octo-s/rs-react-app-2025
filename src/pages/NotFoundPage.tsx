import React from 'react';
import { useNavigate } from 'react-router';
import { TEXTS } from '../texts.ts';
import Button from '../components/Button.tsx';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        {TEXTS.notFoundTitle}
      </h1>
      <p className="text-xl mb-6">{TEXTS.notExist}</p>
      <Button
        text={TEXTS.backToHome}
        onClick={() => navigate('/')}
        className="mt-4"
      />
    </div>
  );
};

export default NotFoundPage;
