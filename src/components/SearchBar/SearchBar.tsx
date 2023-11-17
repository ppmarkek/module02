import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './styles.css';
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

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [refreshPage, setRefreshPage] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(
    searchParams.get('size') ?? '10'
  );

  const { searchResult } = useSearch();

  useEffect(() => {
    setInputValue(searchResult ?? '');
  }, [searchResult]);

  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useGetCategoriesQuery(undefined, {
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
      page: searchParams.get('page') ?? '1',
    },
    { skip: !inputValue }
  );

  const handleSearch = () => {
    dispatch(setSearchResult(inputValue));
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', '1');
    newSearchParams.set('size', itemsPerPage);
    setSearchParams(newSearchParams);
    if (inputValue) {
      refetchRequestedResults().then((response) => {
        if (response.data && !response.error) {
          dispatch(setIsError(false));
          dispatch(setResults(response.data));
        }
      });
    } else {
      refetchCategories().then((response) => {
        dispatch(setIsError(true));
        dispatch(setResults(response.data));
      });
    }
  };

  useEffect(() => {
    refreshPage == true &&
      inputValue === '' &&
      refetchCategories().then((response) => {
        if (response.data && !response.error) {
          dispatch(setIsError(true));
          setRefreshPage(false);
          dispatch(setResults(response.data));
        }
      });
  }, [requestError, requestData, categoriesData, isFetchingCategories]);

  return (
    <div className="searchInputsWrapper">
      <div className="searchBar" data-testid="search-bar">
        <label htmlFor="searchInput" id="SearchTitle">
          Search:
        </label>
        <input
          name="searchInput"
          className="searchInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>
          Show
        </button>
      </div>
      <div className="searchSizer" data-testid="searchSizer">
        <label htmlFor="searchSizeInput" id="SearchTitle">
          Items per page:
        </label>
        <input
          name="searchSizeInput"
          className="searchSizeInput"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
        />
        <button onClick={handleSearch}>Show</button>
      </div>
    </div>
  );
};
