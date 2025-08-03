import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Pagination component', () => {
  it('Rendering: does not render if totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();

    const { container: containerZero } = render(
      <Pagination page={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(containerZero).toBeEmptyDOMElement();
  });

  it('Rendering: renders the current page and total pages', () => {
    render(<Pagination page={3} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByText(/Page 3 of 10/i)).toBeInTheDocument();
  });

  it('Rendering: disables previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).toBeDisabled();
  });

  it('Rendering: disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).toBeDisabled();
  });

  it('User Interaction: calls onPageChange with previous page when "<" is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole('button', { name: '<' });
    await user.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('User Interaction: calls onPageChange with next page when ">" is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole('button', { name: '>' });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
