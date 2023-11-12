import React, { ReactNode } from "react";
import "../Search/style.css";

type SearchWrapperProps = {
  children: ReactNode;
  inputValue: string;
  itemsPage: string;
  newSearch: () => void;
  setItemsPage: (value: string) => void;
  setInputValue?: (value: string) => void;
};

const throwError = () => {
  throw new Error("Intentional error for testing ErrorBoundary");
};

export const SearchWrapper = ({
  children,
  inputValue,
  itemsPage,
  newSearch,
  setItemsPage,
  setInputValue,
}: SearchWrapperProps) => {
  return (
    <div className="wrapper">
      <div className="search">
        <input
          data-testid="search-input"
          onChange={(event) =>
            setInputValue ? setInputValue(event.target.value) : null
          }
          value={inputValue}
        />
        <button
          id="searchButton"
          data-testid="search-button"
          onClick={() => newSearch()}
        >
          Search
        </button>
        <button
          id="errorButton"
          data-testid="error-input"
          onClick={() => throwError()}
        >
          Throw Error
        </button>
        <div className="requestSize">
          <input
            onChange={(event) => setItemsPage(event?.target.value)}
            value={itemsPage}
          />
          <button onClick={() => newSearch()}>Items shown per page</button>
        </div>
      </div>
      {children}
    </div>
  );
};
