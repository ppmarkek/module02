import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import { DetailsCard } from '../DetailsCard';
import { fireEvent } from '@testing-library/react';

const useRouter = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: useRouter,
    route: '/',
    query: {},
    asPath: '',
  }),
}));

describe('DetailsCard component', () => {
  beforeEach(() => {
    useRouter.mockReset();
  });

  it('should render correctly', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementation(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const component = renderWithRedux(<DetailsCard />, {
      initialState: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should navigate to the search after clicking close button', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />, {
      initialState: appStoreMock,
    });
    fireEvent.click(getByTestId('close-details'));

    expect(useRouter).toHaveBeenCalledWith('/');
  });

  it('should navigate to the search after clicking on the background', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />, {
      initialState: appStoreMock,
    });
    fireEvent.click(getByTestId('details-shadow-background'));

    expect(useRouter).toHaveBeenCalledWith('/');
  });
});
