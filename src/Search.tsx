import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Paginator } from './components/Paginator/Paginator';
import { Outlet } from 'react-router-dom';
import { useSearch } from './useSearch';

export const Search = () => {
  const { requestResults, isLoading } = useSearch();

  return (
    <div className="root">
      <SearchBar />
      <SearchResults />
      {requestResults?.results?.length && (
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
