import { renderWithRedux } from '../../../jestUtils';
import {
  appStoreMock,
  resultsMock,
  useSearchHookMock,
} from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import { fireEvent } from '@testing-library/react';
import { SearchItemCard } from '../SearchItemCard';

const navigate = jest.fn();

describe('SearchItemCard component', () => {
  it('should render correctly', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementation(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const component = renderWithRedux(
      <SearchItemCard details={resultsMock.results[0]} number={1} />,
      {
        appStore: appStoreMock,
      }
    );

    expect(component).toMatchSnapshot();
  });

  it('should navigate to the details page', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(useSearch, 'useSearch').mockImplementation(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(
      <SearchItemCard details={resultsMock.results[0]} number={1} />
    );
    fireEvent.click(getByTestId('search-item-card-1'));

    expect(navigate).toHaveBeenCalledWith('/details/test-id');
  });
});
