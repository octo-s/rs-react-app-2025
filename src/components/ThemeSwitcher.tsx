import React, { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider/ThemeContext.ts';
import Button from './Button.tsx';
import { TEXTS } from '../texts.ts';

export const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      aria-label={TEXTS.toggleTheme}
      onClick={toggleTheme}
      variant="secondary"
    >
      {TEXTS.toggleTheme}
    </Button>
  );
};
