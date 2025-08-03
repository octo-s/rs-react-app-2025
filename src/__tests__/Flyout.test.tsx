import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { TEXTS } from '../texts';

describe('Flyout component', () => {
  it('Rendering: renders nothing if count is 0 and children are not passed', () => {
    const { container } = render(<Flyout count={0} onUnselectAll={() => {}} />);
    expect(container).toHaveTextContent(TEXTS.bye);
  });

  it('Rendering: shows correct count and text when count > 0', () => {
    render(<Flyout count={3} onUnselectAll={() => {}} />);
    expect(screen.getByText(TEXTS.itemSelected(3))).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: TEXTS.unselectAll })
    ).toBeInTheDocument();
  });

  it('User Interaction: calls onUnselectAll when Unselect All button is clicked', () => {
    const handleUnselectAll = vi.fn();
    render(<Flyout count={2} onUnselectAll={handleUnselectAll} />);
    fireEvent.click(screen.getByRole('button', { name: TEXTS.unselectAll }));
    expect(handleUnselectAll).toHaveBeenCalledTimes(1);
  });

  it('Rendering: renders children inside the flyout', () => {
    render(
      <Flyout count={5} onUnselectAll={() => {}}>
        <div data-testid="child-content">{TEXTS.download}</div>
      </Flyout>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
