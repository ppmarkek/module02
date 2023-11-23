import { SearchBar } from '../components/SearchBar/SearchBar';
import { SearchResults } from '../components/SearchResults/SearchResults';
import { Paginator } from '../components/Paginator/Paginator';
import { useSearch } from '../useSearch';
import { DetailsCard } from '../components/DetailsCard/DetailsCard';

const Search = () => {
  const { requestResults } = useSearch();

  return (
    <div className="root">
      <SearchBar />
      <SearchResults />
      <DetailsCard />
      {requestResults?.results?.length > 0 && (
        <Paginator
          currentPage={requestResults.currentPage}
          totalPages={requestResults.totalPages}
        />
      )}
    </div>
  );
};

export default Search;
