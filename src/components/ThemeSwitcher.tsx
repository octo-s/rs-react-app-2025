import React, { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider/ThemeContext.ts';
import Button from './Button.tsx';

export const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Button aria-label="Toggle theme" onClick={toggleTheme} variant="secondary">
      Toggle theme
    </Button>
  );
};
