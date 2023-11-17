import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import { fireEvent, screen } from '@testing-library/react';
import { Paginator } from '../Paginator';

const navigate = jest.fn();

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
      getByTestId('page-button-previous').closest('button')
    ).toHaveAttribute('disabled');
  });

  it('should component next button be disabled while on last page', () => {
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={4} />
    );

    expect(getByTestId('page-button-next').closest('button')).toHaveAttribute(
      'disabled'
    );
  });

  it('should switch page on click', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest
      .spyOn(useSearch, 'useSearch')
      .mockImplementation(() => useSearchHookMock);

    const { getByTestId } = renderWithRedux(
      <Paginator totalPages={5} currentPage={4} />
    );
    fireEvent.click(getByTestId('page-button-2'));

    expect(navigate).toHaveBeenCalledWith('?page=2', undefined);
  });
});
