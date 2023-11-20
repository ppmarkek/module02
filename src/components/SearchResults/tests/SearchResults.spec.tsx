import { SearchResults } from '../SearchResults';
import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';

describe('SearchResult component', () => {
  it('should render correctly', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const component = renderWithRedux(<SearchResults />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should display cards', () => {
    const { getByTestId } = renderWithRedux(<SearchResults />, {
      state: appStoreMock,
    });

    expect(getByTestId('search-item-card-1'));
  });

  it('should display loading', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isLoading: true,
    }));

    const { getByTestId } = renderWithRedux(<SearchResults />);

    expect(getByTestId('loading'));
  });

  it('should display categories', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isLoading: false,
      isError: true,
    }));

    const { getByTestId } = renderWithRedux(<SearchResults />);

    expect(getByTestId('empty-results-categories-1'));
  });
});
