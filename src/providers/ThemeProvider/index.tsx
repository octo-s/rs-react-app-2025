import React, { useCallback, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import {
  DARK_THEME,
  defaultTheme,
  LOCAL_STORAGE_THEME_KEY,
  NORMAL_THEME,
  type Theme,
} from './constants.ts';

type ThemeProviderProps = {
  children?: React.ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === NORMAL_THEME ? DARK_THEME : NORMAL_THEME;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }, [theme]);

  const themeProps = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext value={themeProps}>{children}</ThemeContext>;
};

export default ThemeProvider;
