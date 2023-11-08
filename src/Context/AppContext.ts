import { createContext } from 'react';
import { AppContextType } from '../types';

const initialState: AppContextType = {
  inputValue: '',
  setInputValue: () => {},
  searchResult: null,
  setSearchResult: () => {},
  detailsResult: undefined,
  setDetailsResult: () => {},
};
export const AppContext = createContext<AppContextType>(initialState);
