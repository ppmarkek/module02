import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { setLoading, setResults } from '../../redux/componentsReducer';
import { useGetAllRequestedResultsQuery } from '../../redux/apiService';
import { useSearch } from '../../useSearch';

type PaginatorProps = {
  currentPage?: number;
  totalPages?: number;
};

export const Paginator = ({
  currentPage = 1,
  totalPages = 1,
}: PaginatorProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchResult, requestResults, isLoading } = useSearch();

  const page = Array.isArray(router.query.page)
    ? router.query.page[0]
    : router.query.page || '1';

  const queryParams = {
    searchCriteria: searchResult,
    size: requestResults.itemsPerPage?.toString() || '10',
    page,
  };

  const { data: requestData, refetch: refetchRequestedResults } =
    useGetAllRequestedResultsQuery(queryParams);

  useEffect(() => {
    refetchRequestedResults();
  }, [refetchRequestedResults]);

  useEffect(() => {
    if (!isLoading && requestData) {
      dispatch(setResults(requestData));
      dispatch(setLoading(false));
    }
  }, [isLoading, requestData, dispatch]);

  const selectPage = (page: number) => {
    const newQueryParams = {
      ...router.query,
      page: page.toString(),
    };
    router.push({
      pathname: router.pathname,
      query: newQueryParams,
    });
  };

  return (
    <div className={styles.paginatorWrapper}>
      {!isLoading && (
        <div className={styles.paginator} data-testid="paginator">
          <button
            onClick={() => selectPage(currentPage! - 1)}
            data-testid="prev-pagination-button"
            className={styles.paginationButton}
            disabled={currentPage! <= 1}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <div
              key={page}
              className={
                page === currentPage
                  ? styles.activePaginatorButton
                  : styles.paginatorButton
              }
              onClick={() => selectPage(page)}
            >
              {page + 1}
            </div>
          ))}
          <button
            onClick={() => selectPage(currentPage! + 1)}
            data-testid="next-pagination-button"
            className={styles.paginationButton}
            disabled={currentPage! >= totalPages! - 1}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
