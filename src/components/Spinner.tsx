import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center py-8"
      data-testid="spinner"
    >
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin dark:border-blue-100" />
    </div>
  );
};

export default Spinner;
