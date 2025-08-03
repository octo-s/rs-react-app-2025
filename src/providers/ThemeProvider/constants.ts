export const NORMAL_THEME = 'normal';

export const DARK_THEME = 'dark';

export type Theme = typeof NORMAL_THEME | typeof DARK_THEME;

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || DARK_THEME;
