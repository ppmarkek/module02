import { SearchItemCard } from '../SearchItemCard/SearchItemCard';
import { ComponentsReducer, Result } from '../../types';
import './styles.css';
import { useSelector } from 'react-redux';

export const SearchResults = () => {
  const results = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.results
  );
  return (
    <div className="searchResultsWrapper">
      <div className={'searchResults'} data-testid="search-results">
        {results.results.map((result: Result, index: number) => (
          <SearchItemCard key={index} details={result} />
        ))}
      </div>
    </div>
  );
};
