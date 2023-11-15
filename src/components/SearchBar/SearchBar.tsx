import React, { useEffect, useState } from 'react';
import { ComponentsReducer } from '../../types';
import { getAllRequestedResults } from '../../requests';
import { useSearchParams } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading,
  setResults,
  setSearchResult,
} from '../../redux/componentsReducer';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const savedCriteria = useSelector(
    (state: ComponentsReducer) => state.componentsReducer.searchResult
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(savedCriteria ?? '');
  const [itemsPerPage, setItemsPerPage] = useState('10');

  const currentPageQuery = searchParams.get('page');
  const currentSizeQuery = searchParams.get('size');

  const handleSearch = () => {
    dispatch(setLoading(true));
    dispatch(setSearchResult(inputValue));
    setSearchParams({
      ...searchParams,
      page: (0).toString(),
      size: parseInt(itemsPerPage),
    });
    getAllRequestedResults({
      searchCriteria: savedCriteria?.length ? savedCriteria : inputValue,
      size: currentSizeQuery ?? itemsPerPage,
      page: currentPageQuery ?? '1',
    }).then((response) => {
      dispatch(setResults(response));
      dispatch(setLoading(false));
    });
  };

  const throwError = () => {
    throw new Error('Intentional error for testing ErrorBoundary');
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllRequestedResults({
      searchCriteria: inputValue,
      size: currentSizeQuery ?? itemsPerPage,
      page: currentPageQuery ?? '1',
    }).then((response) => {
      dispatch(setResults(response));
      dispatch(setLoading(false));
    });
  }, [currentPageQuery, itemsPerPage]);

  return (
    <div className="searchInputsWrapper">
      <div className="searchBar" data-testid="search-bar">
        <label htmlFor="searchInput" id="SearchTitle">
          Search:
        </label>
        <input
          name="searchInput"
          className="searchInput"
          defaultValue={inputValue}
          onChange={(window) => setInputValue(window.target.value)}
        />
        <button className="searchButton" onClick={() => handleSearch()}>
          show
        </button>
        <button onClick={() => throwError()} id="errorButton">
          Error
        </button>
      </div>
      <div className="searchSizer" data-testid="searchSizer">
        <label htmlFor="searchSizeInput" id="SearchTitle">
          Items per page:
        </label>
        <input
          name="searchSizeInput"
          defaultValue={itemsPerPage}
          onChange={(window) => setItemsPerPage(window.target.value)}
        />
        <button onClick={() => handleSearch()}>show</button>
      </div>
    </div>
  );
};
