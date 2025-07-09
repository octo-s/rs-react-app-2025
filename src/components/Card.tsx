import React from 'react';
import type { Character } from '../api/apiClient';

interface CardProps {
  character: Character;
}

export default class Card extends React.Component<CardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="border p-4 rounded shadow bg-gray-50 flex space-x-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-24 h-24 rounded"
        />
        <div>
          <h3 className="text-lg font-bold">{character.name}</h3>
          <p className="text-gray-700">
            {character.species} - {character.status}
          </p>
        </div>
      </div>
    );
  }
}
