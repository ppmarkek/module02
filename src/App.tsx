import React, { useState } from 'react';
import './App.css';
import { Search } from './Components/Search/Search';
import { Details } from './Components/Details/Details';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppContext } from './Context/AppContext';
import { DetailsType, Results } from './types';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
    children: [
      {
        path: 'details/:id',
        element: <Details />,
      },
    ],
  },
]);

interface SearchResult {
  totalPages: number;
  results: Results[];
}

export const App = () => {
  const storedSearchValue = localStorage.getItem('searchValue');
  const [inputValue, setInputValue] = useState(storedSearchValue ?? '');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [detailsResult, setDetailsResult] = useState<DetailsType | undefined>(
    undefined
  );

  return (
    <AppContext.Provider
      value={{
        inputValue,
        setInputValue,
        searchResult,
        setSearchResult,
        detailsResult,
        setDetailsResult,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};
