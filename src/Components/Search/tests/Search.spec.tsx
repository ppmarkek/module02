import renderer from 'react-test-renderer';
import { Search } from '../Search';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { resultsMock } from '../../../../fixtures/results';

const renderWithRouter = (component: ReactElement) => {
  return {
    ...render(<Router>{component}</Router>),
  };
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search component tests', () => {
  mockedAxios.get.mockImplementation(() => Promise.resolve(resultsMock));
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <Search />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays loading indicator', () => {
    const { getByTestId } = renderWithRouter(<Search />);
    const loaderText = getByTestId('loading-text');

    expect(loaderText).toMatchSnapshot();
  });

  it('should render expanded details', () => {
    const { getByTestId, container } = render(
      <Router>
        <Search />
      </Router>
    );
    const expandButton = getByTestId('search-button');
    fireEvent.click(expandButton);

    expect(container).toMatchSnapshot();
  });

  it('should allow entering a search term', () => {
    const { getByTestId, container } = render(
      <Router>
        <Search />
      </Router>
    );
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'people' } });
    expect(container).toMatchSnapshot('people');
  });

  it('allows user to enter a search term and submit', () => {
    const { getByTestId } = renderWithRouter(<Search />);
    const input = getByTestId('search-input');
    const searchButton = getByTestId('search-button');
    fireEvent.change(input, { target: { value: 'new search term' } });
    fireEvent.click(searchButton);
  });
});
