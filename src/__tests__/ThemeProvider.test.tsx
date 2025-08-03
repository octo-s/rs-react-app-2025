import { useContext } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeProvider from '../providers/ThemeProvider';
import { ThemeContext } from '../providers/ThemeProvider/ThemeContext';
import {
  DARK_THEME,
  NORMAL_THEME,
  LOCAL_STORAGE_THEME_KEY,
} from '../providers/ThemeProvider/constants';
import userEvent from '@testing-library/user-event';
import { TEXTS } from '../texts.ts';

const TestThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>{TEXTS.toggleTheme}</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Rendering: provides default theme to context', () => {
    render(
      <ThemeProvider>
        <TestThemeSwitcher />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe(DARK_THEME);
  });

  it('User Interaction: toggles theme and updates context & localStorage', async () => {
    render(
      <ThemeProvider>
        <TestThemeSwitcher />
      </ThemeProvider>
    );
    const themeValue = screen.getByTestId('theme-value');
    const button = screen.getByRole('button', { name: /toggle theme/i });

    expect(themeValue.textContent).toBe(DARK_THEME);

    await userEvent.click(button);
    expect(themeValue.textContent).toBe(NORMAL_THEME);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(NORMAL_THEME);

    await userEvent.click(button);
    expect(themeValue.textContent).toBe(DARK_THEME);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(DARK_THEME);
  });

  it('Rendering: renders children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">child</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
