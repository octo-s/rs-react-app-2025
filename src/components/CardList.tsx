import React from 'react';
import type { Character } from '../api/apiClient';
import Card from './Card';

interface CardListProps {
  characters: Character[];
}

export default class CardList extends React.Component<CardListProps> {
  render() {
    const { characters } = this.props;

    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-testid="result"
      >
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
