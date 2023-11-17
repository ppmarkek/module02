import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import { fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

const navigate = jest.fn();

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

    expect(navigate).toHaveBeenCalledWith('?page=0&size=10', undefined);
  });

  it('should show search results and navigate with query on show per page button', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(<SearchBar />);
    fireEvent.click(getByTestId('show-per-page-button'));

    expect(navigate).toHaveBeenCalledWith('?page=0&size=10', undefined);
  });

  it('should show search results and navigate with query on show per page button', () => {
    const logSpy = jest.spyOn(global.console, 'error');
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(<SearchBar />);
    fireEvent.click(getByTestId('show-error-button'));

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      'Intentional error for testing ErrorBoundary'
    );
  });
});
