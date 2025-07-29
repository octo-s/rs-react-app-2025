import React from 'react';
import CardList from './CardList';
import Spinner from './Spinner.tsx';
import type { Character } from '../__utils__/characters.ts';
import { TEXTS } from '../texts.ts';

type ResultsProps = {
  characters: Character[];
  loading: boolean;
  error: string | null;
};

const Results: React.FC<ResultsProps> = ({ characters, loading, error }) => {
  return (
    <div className="bg-white p-4 rounded shadow min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2">{TEXTS.resultsTitle}</h2>

      {loading && <Spinner />}

      {error && (
        <div
          className="p-4 bg-red-100 text-red-700 rounded mb-4"
          data-testid="error-message"
        >
          {TEXTS.errorPrefix} {error}
        </div>
      )}

      {!loading && !error && characters.length === 0 && (
        <p data-testid="not-found">{TEXTS.noResults}</p>
      )}

      {!loading && !error && characters.length > 0 && (
        <CardList characters={characters} />
      )}
    </div>
  );
};

export default Results;
