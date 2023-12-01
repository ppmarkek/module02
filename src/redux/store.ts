import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import formReducer from './formReducer';

export const reducer = combineReducers({
  formReducer: formReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
