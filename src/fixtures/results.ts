import { AppState } from '../types';

export const resultsMock = {
  totalPages: 1,
  totalItems: 2,
  results: [
    {
      createdAt: '01-01-0101',
      height: '100',
      id: 'test-id',
      mass: '100',
      name: 'test name',
      updatedAt: '02-02-0202',
      url: 'https://url-1.com',
    },
    {
      createdAt: '02-02-0202',
      height: 'test height',
      id: 'test id',
      mass: 'test mass',
      name: 'test name',
      updatedAt: '03-03-0303',
      url: 'https://url-2.com',
    },
  ],
};

export const useSearchHookMock = {
  requestResults: resultsMock,
  isLoading: false,
  isDetailsLoading: false,
  details: resultsMock.results[0],
  searchResult: 'people',
  isShowDetails: false,
  isError: false,
};

export const appStoreMock: AppState = {
  componentsReducer: {
    details: resultsMock.results[0],
    searchResult: 'people',
    results: resultsMock,
    isLoading: false,
    isDetailsLoading: false,
    isShowDetails: false,
    isError: false,
  },
};
