import React from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

export default class ErrorButton extends React.Component<
  object,
  ErrorButtonState
> {
  state = { hasError: false };

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test error from ErrorThrower');
    }

    return (
      <button
        onClick={this.triggerError}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Trigger Error
      </button>
    );
  }
}
