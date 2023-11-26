import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock } from '../../../fixtures/results';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

const mockUsePathname = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
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

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('SearchBar component', () => {
  it('should render correctly', () => {
    const component = renderWithRedux(<SearchBar />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should show search results and navigate with query on search button', () => {
    mockUsePathname.mockImplementation(() => '/');

    const { getByTestId } = renderWithRedux(<SearchBar />);
    fireEvent.click(getByTestId('search-button'));
  });

  it('should show search results and navigate with query on show per page button', async () => {
    mockUsePathname.mockImplementation(() => '/?page=0&size=10');

    const { getByTestId } = renderWithRedux(<SearchBar />);
    const showPerPageButton = getByTestId('show-per-page-button');

    fireEvent.click(showPerPageButton);

    await waitFor(() => {
      mockUsePathname.mockImplementation(() => '/?page=0&size=10');
    });
  });

  it('should update input value on change', () => {
    const { getByTestId } = renderWithRedux(<SearchBar />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'new search' } });
    expect(searchInput.value).toBe('new search');
  });
});
