import React from 'react';

interface SearchProps {
  onSearch: () => void;
  onChange: (value: string) => void;
  value: string;
}

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
    <div className="bg-white p-4 rounded shadow">
      <div className="space-x-2 flex items-center justify-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded"
          data-testid="search-input"
          placeholder="Search characters by name..."
        />
        <button
          data-testid="search-button"
          onClick={onSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
