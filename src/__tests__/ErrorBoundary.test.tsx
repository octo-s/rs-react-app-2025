import { afterEach, afterAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

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
