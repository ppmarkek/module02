import { Dispatch, SetStateAction } from 'react';

export type Results = {
  updatedAt: string;
  createdAt: string;
  mass: string;
  height: string;
  name: string;
  url: string;
  id: string;
};

export interface SearchResult {
  totalPages: number;
  results: Results[];
}

export type AppContextType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  searchResult: SearchResult | null;
  setSearchResult: Dispatch<SetStateAction<SearchResult | null>>;
  detailsResult: Results | undefined;
  setDetailsResult: Dispatch<SetStateAction<Results | undefined>>;
};
