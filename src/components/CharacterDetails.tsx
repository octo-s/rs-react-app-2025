import React from 'react';
import type { Character } from '../__utils__/characters.ts';
import { TEXTS } from '../texts.ts';

type CharacterDetailsProps = {
  character: Character;
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
}: CharacterDetailsProps) => {
  return (
    <div className="bg-white p-4 pt-14 rounded shadow min-h-[200px]">
      <h2 className="text-xl font-bold mb-3 text-gray-900">{character.name}</h2>
      <div className="w-full flex-1 flex items-center justify-center mb-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover rounded-xl max-h-56 shadow"
        />
      </div>
      <div className="text-m space-y-1 mt-auto">
        <div>
          <span className="font-semibold text-gray-600 mr-1">
            {TEXTS.status}
          </span>
          <span className="text-gray-800">{character.status}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600 mr-1">
            {TEXTS.species}
          </span>
          <span className="text-gray-800">{character.species}</span>
        </div>
        {character.type && (
          <div>
            <span className="font-semibold text-gray-600 mr-1">
              {TEXTS.type}
            </span>
            <span className="text-gray-800">{character.type}</span>
          </div>
        )}
        <div>
          <span className="font-semibold text-gray-600 mr-1">
            {TEXTS.gender}
          </span>
          <span className="text-gray-800">{character.gender}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600  mr-1">
            {TEXTS.origin}
          </span>
          <span className="text-gray-800">{character.origin.name}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600 mr-1">
            {TEXTS.location}
          </span>
          <span className="text-gray-800">{character.location.name}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600 mr-1">
            {TEXTS.created}
          </span>
          <span className="text-gray-800">
            {new Date(character.created).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
