import renderer from 'react-test-renderer';
import { Search } from '../Search';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactElement } from 'react';
import { fireEvent, render } from '@testing-library/react';

const renderWithRouter = (component: ReactElement) => {
  return {
    ...render(<Router>{component}</Router>),
  };
};

describe('Search component tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
});
