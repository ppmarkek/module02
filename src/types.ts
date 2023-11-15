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
};

export type OutletType = {
  isLoading: boolean;
  requestResults: Results;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ComponentsReducer = {
  details: Result;
  componentsReducer: ComponentsReducer;
  searchResult: string;
  results: Result[];
  isLoading: boolean;
};
