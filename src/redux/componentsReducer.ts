import { createSlice } from '@reduxjs/toolkit';
import { Result } from '../types';

const initialState = {
  results: {} as Result,
  details: {} as Result,
  searchResult: '',
  isLoading: false,
  isDetailsLoading: false,
  isShowDetails: false,
  isError: false,
};

const loginSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setResults: (state, { payload }) => {
      state.results = payload;
    },
    setSearchResult: (state, { payload }) => {
      state.searchResult = payload;
    },
    setDetails: (state, { payload }) => {
      state.details = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsDetailsLoading: (state, { payload }) => {
      state.isDetailsLoading = payload;
    },
    setIsShowDetails: (state, { payload }) => {
      state.isShowDetails = payload;
    },
    setIsError: (state, { payload }) => {
      state.isError = payload;
    },
  },
});

export const {
  setResults,
  setSearchResult,
  setDetails,
  setLoading,
  setIsDetailsLoading,
  setIsShowDetails,
  setIsError,
} = loginSlice.actions;
export default loginSlice.reducer;
