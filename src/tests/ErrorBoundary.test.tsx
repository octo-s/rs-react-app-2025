import { afterEach, afterAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton.tsx';
import userEvent from '@testing-library/user-event';

const ProblemChild = () => {
  throw new Error('Problem in child component');
};

function renderProblemChild() {
  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
}

describe('Error Boundary Tests', () => {
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('Error Catching: displays fallback UI when error occurs', () => {
    renderProblemChild();
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('Error Catching: logs error to console', () => {
    renderProblemChild();
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});

describe('ErrorButton component with ErrorBoundary tests', () => {
  it('throws an error, show fallback UI, resets error state on reload', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await userEvent.click(screen.getByTestId('trigger-error-button'));

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(
      screen.getByText(/Test error from ErrorThrower/i)
    ).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('try-again-button'));
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
