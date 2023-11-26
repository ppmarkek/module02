import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import '@testing-library/jest-dom';
import { DetailsCard } from '../DetailsCard';
import { fireEvent } from '@testing-library/react';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => jest.fn(),
  usePathname() {
    return mockUsePathname();
  },
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

describe('DetailsCard component', () => {
  it('should render correctly', () => {
    const component = renderWithRedux(<DetailsCard />, {
      initialState: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  // it('should navigate to the search after clicking close button', () => {
  //   mockUsePathname.mockImplementation(() => '/');

  //   const { getByTestId } = renderWithRedux(<DetailsCard />, {
  //     initialState: { ...appStoreMock, isShowDetails: true },
  //   });
  //   fireEvent.click(getByTestId('close-details'));

  //   expect(mockUsePathname).toHaveBeenCalledWith('/');
  // });

  // it('should navigate to the search after clicking on the background', () => {
  //   mockUsePathname.mockImplementation(() => '/');

  //   const { getByTestId } = renderWithRedux(<DetailsCard />, {
  //     initialState: appStoreMock,
  //   });
  //   fireEvent.click(getByTestId('details-shadow-background'));

  //   expect(mockUsePathname).toHaveBeenCalledWith('/');
  // });
});
