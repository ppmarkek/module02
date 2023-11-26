import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock } from '../../../fixtures/results';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
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

describe('Paginator component', () => {
  it('should render correctly', () => {
    const component = renderWithRedux(<Paginator totalPages={5} />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should not render component while loading', () => {
    renderWithRedux(<Paginator totalPages={5} />);

    expect(screen.queryAllByTestId('paginator')).toHaveLength(1);
  });

  it('should component back button be disabled while on first page', () => {
    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={0} />
    );

    expect(
      getByTestId('prev-pagination-button').closest('button')
    ).toHaveAttribute('disabled');
  });

  it('should component next button be disabled while on last page', () => {
    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={4} />
    );

    expect(
      getByTestId('next-pagination-button').closest('button')
    ).toHaveAttribute('disabled');
  });
});
