import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import type { Character } from '../__types__/characters.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import {
  selectItem,
  unselectItem,
} from '../entities/selected/selectedSlice.ts';
import { UNKNOWN_CHARACTER } from '../__utils__/constants.tsx';

type CardProps = {
  character: Character;
};

const Card: React.FC<CardProps> = ({ character }) => {
  const name = character.name || UNKNOWN_CHARACTER.name;
  const species = character.species || UNKNOWN_CHARACTER.species;
  const status = character.status || UNKNOWN_CHARACTER.status;
  const image = character.image || UNKNOWN_CHARACTER.image;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.selected.selectedIds
  );
  const checked = selectedIds.includes(character.id);
  const handleCheckbox = () => {
    if (checked) {
      dispatch(unselectItem(character.id));
    } else {
      dispatch(selectItem(character.id));
    }
  };

  const handleClick = () => {
    navigate(`/character/${character.id}${location.search}`);
  };
  return (
    <div className="border p-4 rounded shadow bg-gray-50 flex space-x-4 m-2 dark:bg-slate-200 dark:border-blue-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckbox}
        data-testid={`checkbox-${character.id}`}
        className="accent-blue-600 dark:accent-gray-800 "
      />
      <div
        className="cursor-pointer flex space-x-4"
        onClick={handleClick}
        data-testid="character-card"
      >
        <img src={image} alt={name} className="w-24 h-24 rounded" />
        <div data-testid={`character-details-${character.id}`}>
          <h3 className="text-lg font-bold dark:text-red-900">{name}</h3>
          <p className="text-gray-700 dark:text-red-900">
            {species} - {status}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Card;
