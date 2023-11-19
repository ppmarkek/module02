import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import { fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

const navigate = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../redux/apiService', () => {
  const mockData = {
    results: [
      { id: 1, title: 'Test Item 1' },
      { id: 2, title: 'Test Item 2' },
    ],
  };

  const mockCategoriesData = {
    categories: ['Category 1', 'Category 2', 'Category 3'],
  };
  const originalModule = jest.requireActual('../../../redux/apiService');

  const mockUseGetAllRequestedResultsQuery = jest.fn().mockReturnValue({
    data: mockData,
    refetch: jest.fn().mockResolvedValue({ data: mockData }),
  });

  const mockUseGetCategoriesQuery = jest.fn().mockReturnValue({
    data: mockCategoriesData,
    refetch: jest.fn().mockResolvedValue({ data: mockCategoriesData }),
  });

  return {
    ...originalModule,
    useGetAllRequestedResultsQuery: mockUseGetAllRequestedResultsQuery,
    useGetCategoriesQuery: mockUseGetCategoriesQuery,
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest
    .fn()
    .mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

describe('SearchBar component', () => {
  it('should render correctly', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const component = renderWithRedux(<SearchBar />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should show search results and navigate with query on search button', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(<SearchBar />);
    fireEvent.click(getByTestId('search-button'));
  });

  it('should show search results and navigate with query on show per page button', async () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(<SearchBar />);
    const showPerPageButton = getByTestId('show-per-page-button');

    fireEvent.click(showPerPageButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('?page=0&size=10', undefined);
    });
  });

  it('should handle error correctly on error test button', () => {
    const { getByTestId } = renderWithRedux(<SearchBar />);
    fireEvent.click(getByTestId('show-error-button'));

    expect(() => {
      fireEvent.click(getByTestId('show-error-button'));
    }).toThrow('Intentional error for testing ErrorBoundary');
  });

  it('should update input value on change', () => {
    const { getByTestId } = renderWithRedux(<SearchBar />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'new search' } });
    expect(searchInput.value).toBe('new search');
  });
});
