import React from 'react';
import Button from './Button.tsx';

type FlyoutProps = {
  count: number;
  onUnselectAll: () => void;
  children?: React.ReactNode;
};

const Flyout: React.FC<FlyoutProps> = ({ count, onUnselectAll, children }) => {
  const animateClass = count > 0 ? 'translate-y-0' : 'translate-y-full';

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex justify-center pointer-events-none transition-transform duration-500 ease-in will-change-transform ${animateClass}`}
    >
      <div className="flex items-center gap-4 bg-white dark:bg-gray-900 shadow-lg rounded-t-2xl px-6 py-4 mb-0 border-4 border-b-0 border-blue-400 dark:border-gray-700  pointer-events-auto transition-all">
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
          {count > 0 && `${count} ${count === 1 ? 'item' : 'items'} selected`}
          {count === 0 && 'Bye!'}
        </span>
        <Button onClick={onUnselectAll} variant="secondary">
          Unselect all
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Flyout;
