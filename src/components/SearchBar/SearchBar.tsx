import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import {
  setIsError,
  setResults,
  setSearchResult,
} from '../../redux/componentsReducer';
import { useSearch } from '../../useSearch';
import {
  useGetAllRequestedResultsQuery,
  useGetCategoriesQuery,
} from '../../redux/apiService';
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [refreshPage, setRefreshPage] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(
    typeof router.query.size === 'string' ? router.query.size : '10'
  );

  const { searchResult } = useSearch();

  useEffect(() => {
    setInputValue(searchResult ?? '');
  }, [searchResult]);

  const { data: categoriesData, refetch: refetchCategories } =
    useGetCategoriesQuery(undefined, {
      skip: inputValue !== '',
    });

  const {
    data: requestData,
    error: requestError,
    refetch: refetchRequestedResults,
  } = useGetAllRequestedResultsQuery(
    {
      searchCriteria: inputValue,
      size: itemsPerPage,
      page: typeof router.query.page === 'string' ? router.query.page : '0',
    },
    { skip: !inputValue }
  );

  const handleSearch = () => {
    dispatch(setSearchResult(inputValue));
    router.push({
      pathname: router.pathname,
      query: { page: '0', size: itemsPerPage },
    });
    if (inputValue) {
      refetchRequestedResults().then((response) => {
        if (response.data && !response.error) {
          dispatch(setIsError(false));
          dispatch(setResults(response.data));
        } else {
          dispatch(setIsError(true));
        }
      });
    } else {
      dispatch(setIsError(true));
      refetchCategories().then((response) => {
        dispatch(setResults(response.data));
      });
    }
  };

  const throwError = () => {
    throw new Error('Intentional error for testing ErrorBoundary');
  };

  useEffect(() => {
    refreshPage == true &&
      inputValue === '' &&
      refetchCategories().then((response) => {
        if (response.data && !response.error) {
          dispatch(setIsError(true));
          setRefreshPage(false);
          dispatch(setResults(response.data));
        } else {
          dispatch(setIsError(true));
          refetchCategories().then((response) => {
            dispatch(setResults(response.data));
          });
        }
      });
  }, [requestError, requestData, categoriesData]);

  return (
    <div className={styles.searchInputsWrapper}>
      <div className={styles.searchBar} data-testid="search-bar">
        <label htmlFor="searchInput" className={styles.searchTitle}>
          Search:
        </label>
        <input
          name="searchInput"
          className={styles.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          data-testid="search-input"
        />
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          data-testid="search-button"
        >
          Show
        </button>
        <button
          onClick={throwError}
          data-testid="show-error-button"
          className={styles.errorButton}
        >
          Test Error
        </button>
      </div>
      <div className={styles.searchSizer} data-testid="searchSizer">
        <label htmlFor="searchSizeInput" id="SearchTitle">
          Items per page:
        </label>
        <input
          name="searchSizeInput"
          className={styles.searchSizeInput}
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
        />
        <button onClick={handleSearch} data-testid="show-per-page-button">
          Show
        </button>
      </div>
    </div>
  );
};
