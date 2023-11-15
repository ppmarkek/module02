import { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Paginator } from './components/Paginator/Paginator';
import { ComponentsReducer } from './types';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Search = () => {
  const requestResults = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.results
  );
  const isLoading = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.isLoading
  );

  return (
    <div className="root">
      <SearchBar />
      <SearchResults />
      {requestResults.results.length && (
        <Paginator
          pages={requestResults.totalPages}
          currentPage={requestResults.currentPage}
          totalPages={requestResults.totalPages}
          isLoading={isLoading}
        />
      )}
      <Outlet context={requestResults} />
    </div>
  );
};
