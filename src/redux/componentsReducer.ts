import { createSlice } from '@reduxjs/toolkit';
import { Result } from '../types';

const initialState = {
  results: {} as Result,
  details: {} as Result,
  searchResult: '',
  isLoading: false,
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
  },
});

export const { setResults, setSearchResult, setDetails, setLoading } =
  loginSlice.actions;
export default loginSlice.reducer;
