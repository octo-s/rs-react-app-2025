import React, { useEffect, useState } from 'react';

import SearchBar from './SearchBar.tsx';
import Results from './Results';
import { useSearch } from '../hooks/useSearch';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';
import Pagination from './Pagination.tsx';
import { FIRST_PAGE } from '../constants.tsx';

const Search: React.FC = () => {
  const { query, page, loading, error, results, totalPages, search } =
    useSearch();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', query);
  const [value, setValue] = useState(searchQuery);

  useEffect(() => {
    search({
      query: searchQuery,
      page: FIRST_PAGE,
    });
  }, [search, searchQuery]);

  const handleSearch = () => {
    const trimmed = value.trim();
    setSearchQuery(trimmed);
    search({
      query: trimmed,
      page: FIRST_PAGE,
    });
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const handlePageChange = (newPage: number) => {
    search({
      query: searchQuery,
      page: newPage,
    });
  };

  return (
    <>
      <SearchBar value={value} onSearch={handleSearch} onChange={onChange} />
      <Results characters={results} loading={loading} error={error} />
      <Pagination
        page={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  );
};

export default Search;
