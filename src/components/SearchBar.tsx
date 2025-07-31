import React from 'react';
import Button from './Button.tsx';
import { TEXTS } from '../texts.ts';

type SearchProps = {
  onSearch: () => void;
  onChange: (value: string) => void;
  value: string;
};

const SearchBar: React.FC<SearchProps> = ({ onSearch, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow my-4 dark:bg-gray-300">
      <div className="space-x-2  flex items-center justify-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded dark:bg-gray-100"
          data-testid="search-input"
          placeholder={TEXTS.searchPlaceholder}
        />
        <Button
          data-testid="search-button"
          onClick={onSearch}
          text={TEXTS.searchButton}
          className="ml-8"
        />
      </div>
    </div>
  );
};

export default SearchBar;
