import React, { useEffect, useRef, useState } from 'react';

import SearchBar from './SearchBar.tsx';
import Results from './Results';
import { useSearch } from '../hooks/useSearch';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';
import Pagination from './Pagination.tsx';
import { FIRST_PAGE } from '../constants.tsx';
import { Outlet, useParams, useSearchParams } from 'react-router';

const Search: React.FC = () => {
  const { query, loading, error, results, totalPages, search } = useSearch();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', query);
  const [value, setValue] = useState(searchQuery);
  const initialQueryRef = useRef(searchQuery);
  const [params, setParams] = useSearchParams();
  const { id } = useParams();

  const initialPage = Number(params.get('page')) || FIRST_PAGE;

  useEffect(() => {
    search({
      query: initialQueryRef.current,
      page: initialPage,
    });
  }, [search, initialPage]);

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
    setParams({ page: String(newPage) });
    search({
      query: searchQuery,
      page: newPage,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <SearchBar value={value} onSearch={handleSearch} onChange={onChange} />
      <div className="flex">
        <div
          className={`min-w-0 ${id ? 'w-[65%]' : 'w-full'} ${id ? 'mr-4' : 'mr-0'} transition-all duration-400 ease-in-out`}
        >
          <Results characters={results} loading={loading} error={error} />
        </div>

        <Outlet />
      </div>
      <Pagination
        page={initialPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Search;
