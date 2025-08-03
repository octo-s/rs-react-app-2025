import React from 'react';
import type { Character } from '../__types__/characters.ts';
import { TEXTS } from '../texts.ts';

type CharacterDetailsProps = {
  character: Character;
};

type DetailsListItem = {
  key: keyof Character;
  label: string;
  nested?: boolean;
  onlyIf?: (character: Character) => boolean;
};

const detailsList: DetailsListItem[] = [
  { key: 'status', label: TEXTS.status },
  { key: 'species', label: TEXTS.species },
  { key: 'gender', label: TEXTS.gender },
  { key: 'type', label: TEXTS.type },
  { key: 'origin', label: TEXTS.origin, nested: true },
  { key: 'location', label: TEXTS.location, nested: true },
];

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
}: CharacterDetailsProps) => {
  return (
    <div className="bg-white p-4 pt-14 rounded shadow min-h-[200px] dark:bg-gray-300">
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-700">
        {character.name}
      </h2>
      <div className="w-full flex-1 flex items-center justify-center mb-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover rounded-xl max-h-56 shadow"
        />
      </div>
      <div className="text-m space-y-1 mt-auto">
        {detailsList.map(({ key, label, nested }) => {
          const value = character[key];

          if (!value) {
            return null;
          }

          const displayValue =
            nested && typeof value === 'object' && 'name' in value
              ? value.name
              : value;

          return (
            <div key={key}>
              <span className="font-semibold text-gray-600 mr-1  dark:text-red-900">
                {label}
              </span>
              <span className="text-gray-800">{String(displayValue)}</span>
            </div>
          );
        })}
        <div>
          <span className="font-semibold text-gray-600 mr-1 dark:text-red-900">
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
