import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { apiService } from './apiService';
import componentsReducer from './componentsReducer';

export const reducer = combineReducers({
  componentsReducer: componentsReducer,
  [apiService.reducerPath]: apiService.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiService.middleware),
});
