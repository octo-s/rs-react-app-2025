import React from 'react';
import { TEXTS } from '../texts.ts';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const BUTTON_STYLE =
    'px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 dark:text-red-900';

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={BUTTON_STYLE}
      >
        &lt;
      </button>
      <span className="mx-2 font-semibold dark:text-white">
        {TEXTS.pagination(page, totalPages)}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={BUTTON_STYLE}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
