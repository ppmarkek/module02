import { SearchItemCard } from '../SearchItemCard/SearchItemCard';
import { Result } from '../../types';
import './styles.css';
import { useSearch } from '../../useSearch';

export const SearchResults = () => {
  const { requestResults, isLoading, isError } = useSearch();
  const emptyResult = Object.keys(requestResults).map((value, index) => (
    <p key={index} data-testid={`empty-results-categories-${index}`}>
      <h4>{value}</h4>
    </p>
  ));

  return (
    <div className="searchResultsWrapper">
      <div
        className={`searchResults ${isError && 'error'}`}
        data-testid="search-results"
      >
        {isLoading && <h3 data-testid="loading">Loading...</h3>}
        {isError && !isLoading && (
          <h2 data-testid="error">
            Nothing found by selected criteria, try this keywords:{' '}
          </h2>
        )}
        {isError && !isLoading && emptyResult}
        {!isError &&
          !isLoading &&
          requestResults?.results?.map((result: Result, index: number) => (
            <SearchItemCard key={index} details={result} number={index} />
          ))}
      </div>
    </div>
  );
};
