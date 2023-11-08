import renderer from 'react-test-renderer';
import { Search } from './src/Components/Search/Search';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';

it('рендерится корректно', () => {
  const history = createMemoryHistory();
  const tree = renderer
    .create(
      <Router location={history}>
        <Search />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
