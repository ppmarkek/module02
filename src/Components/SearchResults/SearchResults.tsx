import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Results, SearchResult } from '../../types';
import '../Search/style.css';

type SearchResultsProps = {
  isLoading: boolean;
  detailsResult?: Results;
  searchResult: SearchResult | null;
  searchValue: boolean;
  closeDetails: () => void;
  getDetailsData: (id: string) => Promise<void>;
};

export const SearchResults = ({
  isLoading,
  detailsResult,
  searchResult,
  searchValue,
  closeDetails,
  getDetailsData,
}: SearchResultsProps) => {
  const navigate = useNavigate();

  return (
    <div className={'result'}>
      <div
        className={detailsResult ? 'fiftyPercentResult' : 'fullResult'}
        onClick={() => detailsResult && closeDetails()}
      >
        {isLoading && !searchResult && (
          <div data-testid="loading-text">Loading...</div>
        )}
        {!isLoading &&
          searchResult &&
          searchValue &&
          searchResult?.results?.map((value: Results, index: number) => (
            <div
              className={'Cart'}
              key={index}
              data-testid={`result-card-${index + 1}`}
              onClick={() => {
                if (!detailsResult) {
                  navigate(`/details/${value.id}`);
                  getDetailsData((value.id ?? '0').toString());
                }
              }}
            >
              <h3>Name: {value.name}</h3>
              <p>Created: {value.createdAt}</p>
              <p>Edited: {value.updatedAt}</p>
              <p>Height: {value.height}</p>
              <p>Mass: {value.mass}</p>
            </div>
          ))}
        {!isLoading &&
          searchResult &&
          !searchValue &&
          Object.keys(searchResult).map((value, index) => (
            <div key={index}>
              <h3>{value}</h3>
            </div>
          ))}
      </div>
      {!isLoading && <Outlet />}
    </div>
  );
};
