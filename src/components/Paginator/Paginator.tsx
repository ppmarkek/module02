import { useSearchParams } from 'react-router-dom';
import './styles.css';

type PaginatorProps = {
  isLoading: boolean;
  pages: number;
  currentPage?: number;
  totalPages?: number;
};

export const Paginator = ({
  pages,
  currentPage,
  totalPages,
  isLoading,
}: PaginatorProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="paginatorWrapper">
      {!isLoading && (
        <div className="paginator" data-testid="paginator">
          <button
            onClick={() =>
              setSearchParams({
                ...searchParams,
                page: (currentPage! - 1).toString(),
              })
            }
            data-testid="first-pagination-button"
            className="paginationButton"
            disabled={currentPage! <= 0}
          >
            &lt;
          </button>
          {[...Array(pages).keys()].map((page, index) => (
            <div
              key={index}
              className={
                index === currentPage
                  ? 'activePaginatorButton'
                  : 'paginatorButton'
              }
              onClick={() =>
                setSearchParams({
                  ...searchParams,
                  page: index.toString(),
                })
              }
            >
              {page + 1}
            </div>
          ))}
          <button
            onClick={() =>
              setSearchParams({
                ...searchParams,
                page: (currentPage! + 1).toString(),
              })
            }
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
