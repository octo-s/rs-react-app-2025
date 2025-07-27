import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import type { Character } from '../types.ts';

type CardProps = {
  character: Character;
};

const Card: React.FC<CardProps> = ({ character }) => {
  const name = character.name || 'Unknown name';
  const species = character.species || 'Unknown species';
  const status = character.status || 'Unknown status';
  const image = character.image || 'https://placehold.co/300x300/png';
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/character/${character.id}${location.search}`);
  };
  return (
    <div
      className="border p-4 rounded shadow bg-gray-50 flex space-x-4 cursor-pointer m-2"
      data-testid="character-card"
      onClick={handleClick}
    >
      <img src={image} alt={name} className="w-24 h-24 rounded" />
      <div data-testid={`character-details-${character.id}`}>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-700">
          {species} - {status}
        </p>
      </div>
    </div>
  );
};
export default Card;
