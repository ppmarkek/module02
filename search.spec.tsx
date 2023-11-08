import renderer from 'react-test-renderer';
import { Search } from './src/Components/Search/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Details } from './src/Components/Details/Details';
import { fireEvent, render } from '@testing-library/react';

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

it('renders correctly', () => {
  const tree = renderer.create(<Details />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render expanded details', () => {
  const { getByTestId, container } = render(
    <Router>
      <Search />
    </Router>
  );
  const expandButton = getByTestId('search-button');
  const firstPaginationButton = getByTestId('first-pagination-button');
  const secondPaginationButton = getByTestId('second-pagination-button');

  fireEvent.click(expandButton);
  fireEvent.click(firstPaginationButton);
  fireEvent.click(secondPaginationButton);
  expect(container).toMatchSnapshot();
});
