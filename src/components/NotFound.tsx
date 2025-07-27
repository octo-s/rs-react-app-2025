import React from 'react';
import { useNavigate } from 'react-router';
import Button from './Button.tsx';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-xl mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Button
        text={'Back to Home'}
        onClick={() => navigate('/')}
        className="mt-4"
      />
    </div>
  );
};

export default NotFound;
