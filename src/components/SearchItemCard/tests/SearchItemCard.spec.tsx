import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, resultsMock } from '../../../fixtures/results';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { SearchItemCard } from '../SearchItemCard';

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

describe('SearchItemCard component', () => {
  it('should render correctly', () => {
    const component = renderWithRedux(
      <SearchItemCard details={resultsMock.results[0]} number={1} />,
      {
        appStore: appStoreMock,
      }
    );

    expect(component).toMatchSnapshot();
  });
});
