import React, { useEffect, useRef, useState } from 'react';
import { unselectAll } from '../entities/selected/selectedSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import Flyout from './Flyout.tsx';
import { arrayToCSV } from '../__utils__/arrayToCSV.ts';

const SelectedCharacters: React.FC = () => {
  const [show, setShow] = useState(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selected.selectedCharacters
  );
  const count = selectedCharacters.length;

  useEffect(() => {
    if (selectedCharacters.length > 0) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedCharacters.length]);

  const onUnselectAll = () => {
    dispatch(unselectAll());
  };

  function handleClick() {
    const csv = arrayToCSV(selectedCharacters);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${selectedCharacters.length}_items.csv`;

      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
  }

  if (!show && count === 0) return null;

  return (
    <Flyout onUnselectAll={onUnselectAll} count={count}>
      <a
        onClick={handleClick}
        ref={linkRef}
        className="px-6 py-2 rounded font-semibold shadow outline-none border-none transition bg-blue-600 text-white hover:text-white dark:bg-red-900"
        href=""
      >
        Download
      </a>
    </Flyout>
  );
};

export default SelectedCharacters;
