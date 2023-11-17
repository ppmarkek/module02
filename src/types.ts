import React from 'react';

export type Result = {
  name: string;
  height: string;
  mass: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  url: string;
  category?: string;
};

export type Results = {
  results: Result[];
  totalPages: number;
  totalItems?: number;
  currentPage?: number;
  category?: string;
  itemsPerPage?: string;
};

export type OutletType = {
  isLoading: boolean;
  requestResults: Results;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AppState = {
  componentsReducer: ComponentsReducer;
};

export type ComponentsReducer = {
  details: Result;
  searchResult: string;
  results: Results;
  isLoading: boolean;
  isDetailsLoading: boolean;
  isShowDetails: boolean;
  isError: boolean;
};
