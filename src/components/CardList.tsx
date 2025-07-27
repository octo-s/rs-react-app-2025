import React from 'react';
import Card from './Card';
import type { Character } from '../types.ts';

type CardListProps = {
  characters: Character[];
};

const CardList: React.FC<CardListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" data-testid="result">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};
export default CardList;
