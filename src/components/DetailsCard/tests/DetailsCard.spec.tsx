import { renderWithRedux } from '../../../jestUtils';
import { appStoreMock, useSearchHookMock } from '../../../fixtures/results';
import * as useSearch from '../../../useSearch';
import '@testing-library/jest-dom';
import { DetailsCard } from '../DetailsCard';
import * as router from 'react-router';
import { fireEvent } from '@testing-library/react';

const navigate = jest.fn();

describe('DetailsCard component', () => {
  it('should render correctly', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementation(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const component = renderWithRedux(<DetailsCard />, {
      appStore: appStoreMock,
    });

    expect(component).toMatchSnapshot();
  });

  it('should render loading', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
      isDetailsLoading: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />);

    expect(getByTestId('loading-details'));
  });

  it('should render close button', () => {
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />);

    expect(getByTestId('close-details'));
  });

  it('should navigate to the search after clicking close button', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />);
    fireEvent.click(getByTestId('close-details'));

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to the search after clicking on the background', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(useSearch, 'useSearch').mockImplementationOnce(() => ({
      ...useSearchHookMock,
      isShowDetails: true,
    }));

    const { getByTestId } = renderWithRedux(<DetailsCard />);
    fireEvent.click(getByTestId('details-shadow-background'));

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
