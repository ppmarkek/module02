import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import axios from 'axios';
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import { Details } from '../Details/Details';
import { AppContext } from '../../Context/AppContext';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchWrapper } from '../SearchWrapper/SearchWrapper';

const API_URL = 'https://backend.dreamdev.lv/api';

type Props = {
  page?: number;
  size?: number;
  inputValue: string;
};

export const Search = () => {
  const {
    inputValue,
    setInputValue,
    searchResult,
    setSearchResult,
    detailsResult,
    setDetailsResult,
  } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPage, setItemsPage] = useState('10');
  const [searchValue, setSearchValue] = useState(false);
  const navigate = useNavigate();

  const totalPages = searchResult?.totalPages;
  const currentPage = Number(searchParams.get('page')) ?? 1;
  const getData = async ({ page = 1, size = 10, inputValue }: Props) => {
    setIsLoading(true);
    setSearchValue(true);
    await axios
      .get(
        `${API_URL}/${
          inputValue.length === 0 ? inputValue : `${inputValue}/`
        }?page=${page}&size=${size}`
      )
      .then((response) => {
        setSearchResult(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        initialRequest();
        setIsLoading(false);
        throw error;
      });
  };

  const initialRequest = async () => {
    setIsLoading(true);
    setSearchValue(false);
    await axios
      .get(`https://backend.dreamdev.lv/`)
      .then((response) => {
        setSearchResult(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
  };

  const newSearch = () => {
    localStorage.setItem('searchValue', inputValue);
    getData({ page: currentPage, size: parseInt(itemsPage), inputValue });
    setSearchParams({
      ...searchParams,
      page: (0).toString(),
      size: parseInt(itemsPage),
    });
  };

  const getDetailsData = async (id: string) => {
    setIsLoading(true);
    await axios
      .get(
        `${API_URL}/${
          inputValue.length === 0 ? inputValue : `${inputValue}/${id}`
        }`
      )
      .then((response) => {
        setDetailsResult(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
  };

  const closeDetails = () => {
    setDetailsResult(undefined);
    navigate('/');
    localStorage.setItem('searchValue', inputValue);
    getData({ page: 0, size: parseInt(itemsPage), inputValue });
    setSearchParams({
      ...searchParams,
      page: (0).toString(),
      size: parseInt(itemsPage),
    });
  };

  useEffect(() => {
    getData({ page: currentPage, size: parseInt(itemsPage), inputValue });
  }, []);

  const PagginationButtons = ({
    totalPages,
    currentPage,
  }: {
    totalPages: number | undefined;
    currentPage: number | undefined;
  }) => {
    if (totalPages === undefined || currentPage === undefined) {
      return null;
    }

    const setPage = (pageNumber: number) => {
      setSearchParams({
        ...searchParams,
        page: pageNumber.toString(),
        size: parseInt(itemsPage),
      });
      getData({ page: pageNumber, size: parseInt(itemsPage), inputValue });
    };

    return (
      <div className="pagination">
        <button
          onClick={() => setPage(currentPage - 1)}
          data-testid="first-pagination-button"
          className="paginationButton"
          disabled={currentPage <= 0}
        >
          &lt;
        </button>

        {[...Array(totalPages).keys()].map((page, index) => (
          <button
            onClick={() => setPage(page)}
            className={
              index === currentPage
                ? 'activePaginationButton'
                : 'paginationButton'
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(currentPage + 1)}
          data-testid="second-pagination-button"
          className="paginationButton"
          disabled={currentPage >= totalPages - 1}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SearchWrapper
            inputValue={inputValue}
            itemsPage={itemsPage}
            newSearch={newSearch}
            setItemsPage={(event) => setItemsPage(event)}
            setInputValue={(event) => setInputValue(event)}
          >
            <SearchResults
              isLoading={isLoading}
              detailsResult={detailsResult}
              searchResult={searchResult}
              searchValue={searchValue}
              closeDetails={closeDetails}
              getDetailsData={getDetailsData}
            />
            {!isLoading && (
              <PagginationButtons
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
          </SearchWrapper>
        }
      >
        <Route
          path={`details/:id`}
          element={
            <Details
              detailsInfo={detailsResult}
              onClickClose={() => closeDetails()}
            />
          }
        />
      </Route>
    </Routes>
  );
};
