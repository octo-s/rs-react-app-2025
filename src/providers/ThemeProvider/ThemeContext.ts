import { createContext } from 'react';
import type { ThemeContextProps } from './types.ts';
import { defaultTheme } from './constants.ts';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
  toggleTheme: () => {},
});
