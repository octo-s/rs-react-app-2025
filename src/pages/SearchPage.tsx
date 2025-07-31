import React, { useEffect, useRef, useState } from 'react';

import { useSearch } from '../hooks/useSearch';
import { useLocalStorage } from '../hooks/useLocalStorage.tsx';
import { FIRST_PAGE } from '../__utils__/constants.tsx';
import { Outlet, useParams, useSearchParams } from 'react-router';
import SearchBar from '../components/SearchBar.tsx';
import Results from '../components/Results.tsx';
import Pagination from '../components/Pagination.tsx';
import type { SearchParams } from '../__types__/search.ts';

const SearchPage: React.FC = () => {
  const { id } = useParams();

  const { query, loading, error, results, totalPages, search } = useSearch();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', query);
  const [value, setValue] = useState(searchQuery);
  const [params, setParams] = useSearchParams();
  const paramsPage = Number(params.get('page')) || FIRST_PAGE;

  const initialValuesRef = useRef<SearchParams>({
    query: searchQuery,
    page: paramsPage,
  });

  useEffect(() => {
    search({
      query: initialValuesRef.current.query,
      page: initialValuesRef.current.page,
    });
  }, [search]);

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
          data-testid="results-block"
          className={`min-w-0 ${id ? 'w-[65%]' : 'w-full'} ${id ? 'mr-4' : 'mr-0'} transition-all duration-400 ease-in-out`}
        >
          <Results characters={results} loading={loading} error={error} />
        </div>
        <Outlet />
      </div>
      <Pagination
        page={paramsPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SearchPage;
