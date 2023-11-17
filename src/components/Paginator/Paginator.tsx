import { useSearchParams } from 'react-router-dom';
import './styles.css';
import { useGetAllRequestedResultsQuery } from '../../redux/apiService';
import { useSearch } from '../../useSearch';

type PaginatorProps = {
  currentPage?: number;
  totalPages?: number;
};

export const Paginator = ({ currentPage, totalPages }: PaginatorProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResult, requestResults, isLoading } = useSearch();

  useGetAllRequestedResultsQuery(
    {
      searchCriteria: searchResult,
      size: requestResults.itemsPerPage,
      page: currentPage?.toString() ?? '1',
    },
    {
      skip: !currentPage,
    }
  );

  const selectPage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };

  return (
    <div className="paginatorWrapper">
      {!isLoading && (
        <div className="paginator" data-testid="paginator">
          <button
            onClick={() => selectPage(currentPage! - 1)}
            data-testid="page-button-previous"
            className="paginationButton"
            disabled={currentPage! <= 0}
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((page, index) => (
            <div
              key={index}
              data-testid={`page-button-${index}`}
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
            data-testid="page-button-next"
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
