import type { Theme } from './constants.ts';

export type ThemeContextProps = {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
  toggleTheme: () => void;
};
