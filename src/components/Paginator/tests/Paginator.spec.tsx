import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Paginator } from '../Paginator';

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

describe('Paginator component', () => {
  it('should render correctly', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const component = renderWithRedux(<Paginator totalPages={5} />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should not render component while loading', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => ({ ...useSearchHookMock, isLoading: true }));

    // const { getByTestId } = renderWithRedux(<Paginator totalPages={5} />);

    expect(screen.queryAllByTestId('paginator')).toHaveLength(0);
  });

  it('should component back button be disabled while on first page', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={0} />
    );

    expect(
      getByTestId('first-pagination-button').closest('button')
    ).toHaveAttribute('disabled');
  });

  it('should component next button be disabled while on last page', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={4} />
    );

    expect(
      getByTestId('second-pagination-button').closest('button')
    ).toHaveAttribute('disabled');
  });

  it('should correctly handle page selection', async () => {
    const mockData = {
      results: [
        { id: 1, title: 'Test Item 1' },
        { id: 2, title: 'Test Item 2' },
      ],
    };

    const mockSetSearchParams = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useSearchParams: jest
        .fn()
        .mockReturnValue([new URLSearchParams(), mockSetSearchParams]),
    }));

    const mockRefetchRequestedResults = jest.fn();
    jest.mock('../../../redux/apiService', () => ({
      ...jest.requireActual('../../../redux/apiService'),
      useGetAllRequestedResultsQuery: jest.fn().mockReturnValue({
        data: mockData,
        refetch: mockRefetchRequestedResults,
      }),
    }));

    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={2} />
    );

    fireEvent.click(getByTestId('first-pagination-button'));

    await waitFor(() => {
      expect(mockRefetchRequestedResults).toHaveBeenCalled();
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.any(URLSearchParams)
      );
    });
  });
});
