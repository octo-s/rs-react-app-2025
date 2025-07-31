import React from 'react';
import { TEXTS } from '../texts.ts';
import Button from './Button.tsx';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(TEXTS.caughtError, error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center" data-testid="fallback">
          <h1 className="text-2xl font-bold mb-4">{TEXTS.fallbackTitle}</h1>
          <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
          <Button
            onClick={this.handleReload}
            data-testid="try-again-button"
            text={TEXTS.tryAgain}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
