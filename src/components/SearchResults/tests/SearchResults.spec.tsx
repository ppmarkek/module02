import { SearchResults } from '../SearchResults';
import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock } from '../../../fixtures/results';
import '@testing-library/jest-dom';

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
      route: '/details/test-id',
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

describe('SearchResult component', () => {
  it('should render correctly', () => {
    const component = renderWithRedux(<SearchResults />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  // it('should display cards', () => {
  //   const { getByTestId } = renderWithRedux(<SearchResults />, {
  //     state: appStoreMock,
  //   });

  //   expect(getByTestId('search-item-card-1'));
  // });

  // it('should display loading', () => {
  //   const { getByTestId } = renderWithRedux(<SearchResults />);

  //   expect(getByTestId('loading'));
  // });

  // it('should display categories', () => {
  //   const { getByTestId } = renderWithRedux(<SearchResults />);

  //   expect(getByTestId('empty-results-categories-1'));
  // });

  it('should render Wrapper', () => {
    const { getByTestId } = renderWithRedux(<SearchResults />);

    expect(getByTestId('search-results'));
  });
});
