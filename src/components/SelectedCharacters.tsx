import React, { useEffect, useState } from 'react';
import { generateDataUrl } from '../__utils__/generateDataUrl.ts';
import { unselectAll } from '../entities/selected/selectedSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import Flyout from './Flyout.tsx';

const SelectedCharacters: React.FC = () => {
  const [show, setShow] = useState(false);
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

  if (!show && count === 0) return null;

  const onUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <Flyout onUnselectAll={onUnselectAll} count={count}>
      <a
        className="px-6 py-2 rounded font-semibold shadow outline-none border-none transition bg-blue-600 text-white hover:text-white dark:bg-red-900"
        href={generateDataUrl(selectedCharacters)}
        download={`${selectedCharacters.length}_items.csv`}
      >
        Download
      </a>
    </Flyout>
  );
};

export default SelectedCharacters;
