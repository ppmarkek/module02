import { useSearchParams } from 'react-router-dom';
import './styles.css';
import { useGetAllRequestedResultsQuery } from '../../redux/apiService';
import { useSearch } from '../../useSearch';
import { useDispatch } from 'react-redux';
import { setLoading, setResults } from '../../redux/componentsReducer';
import React, { useState, useEffect } from 'react';

type PaginatorProps = {
  currentPage?: number;
  totalPages?: number;
};

export const Paginator = ({ currentPage, totalPages }: PaginatorProps) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResult, requestResults, isLoading } = useSearch();

  const [queryParams, setQueryParams] = useState({
    searchCriteria: searchResult,
    size: requestResults.itemsPerPage?.toString() || '10',
    page: searchParams.get('page') ?? '1',
  });

  useEffect(() => {
    setQueryParams((qp) => ({
      ...qp,
      searchCriteria: searchResult,
      size: requestResults.itemsPerPage?.toString() || '10',
    }));
  }, [searchResult, requestResults.itemsPerPage]);

  const { data: requestData, refetch: refetchRequestedResults } =
    useGetAllRequestedResultsQuery(queryParams);

  const selectPage = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', page.toString());
    newSearchParams.set('size', queryParams.size);
    setSearchParams(newSearchParams);

    setQueryParams((qp) => ({ ...qp, page: page.toString() }));

    refetchRequestedResults();
  };

  useEffect(() => {
    // Обработка данных из запроса
    if (!isLoading && requestData) {
      dispatch(setResults(requestData));
      dispatch(setLoading(false));
    }
  }, [isLoading, requestData, dispatch]);

  return (
    <div className="paginatorWrapper">
      {!isLoading && (
        <div className="paginator" data-testid="paginator">
          <button
            onClick={() => selectPage(currentPage! - 1)}
            data-testid="first-pagination-button"
            className="paginationButton"
            disabled={currentPage! <= 0}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((page, index) => (
            <div
              key={index}
              className={
                index === currentPage
                  ? 'activePaginatorButton'
                  : 'paginatorButton'
              }
              onClick={() => selectPage(index)}
            >
              {page + 1}
            </div>
          ))}
          <button
            onClick={() => selectPage(currentPage! + 1)}
            data-testid="second-pagination-button"
            className="paginationButton"
            disabled={currentPage! >= totalPages! - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
