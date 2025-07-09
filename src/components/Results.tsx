import React from 'react';
import type { Character } from '../api/apiClient';
import CardList from './CardList';
import Spinner from './Spinner.tsx';

interface ResultsProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export default class Results extends React.Component<ResultsProps> {
  render() {
    const { characters, loading, error } = this.props;

    return (
      <div className="bg-white p-4 rounded shadow min-h-[200px]">
        <h2 className="text-xl font-semibold mb-2">Results</h2>

        {loading && <Spinner />}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
            Error: {error}
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <p>No results found.</p>
        )}

        {!loading && !error && characters.length > 0 && (
          <CardList characters={characters} />
        )}
      </div>
    );
  }
}
