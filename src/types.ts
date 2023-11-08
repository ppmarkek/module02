import { Dispatch, ReactNode, SetStateAction } from 'react';

type Result = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Results = {
  updatedAt: ReactNode;
  createdAt: ReactNode;
  mass: ReactNode;
  height: ReactNode;
  edited: ReactNode;
  created: ReactNode;
  name: ReactNode;
  count: number;
  next: string;
  previous: string;
  results: Result[];
  id: string;
};

export type DetailsType = {
  createdAt: string;
  height: string;
  id: string;
  mass: string;
  name: string;
  updatedAt: string;
  url: string;
};

interface SearchResult {
  totalPages: number;
  results: Results[];
}

export type AppContextType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  searchResult: SearchResult | null;
  setSearchResult: Dispatch<SetStateAction<SearchResult | null>>;
  detailsResult: DetailsType | undefined;
  setDetailsResult: Dispatch<SetStateAction<DetailsType | undefined>>;
};
