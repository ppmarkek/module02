import renderer from 'react-test-renderer';
import { Search } from './src/Components/Search/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { ReactElement, useContext } from 'react';
import { Details } from './src/Components/Details/Details';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextType, DetailsType } from './src/types';
import { AppContext } from './src/Context/AppContext';

const mockSetInputValue = jest.fn();
const mockSetSearchResult = jest.fn();
const mockSetDetailsResult = jest.fn();

const initialState: AppContextType = {
  inputValue: '',
  setInputValue: mockSetInputValue,
  searchResult: null,
  setSearchResult: mockSetSearchResult,
  detailsResult: undefined,
  setDetailsResult: mockSetDetailsResult,
};

const renderWithRouter = (component: ReactElement) => {
  return {
    ...render(<Router>{component}</Router>),
  };
};

const ConsumerComponent = () => {
  const {
    inputValue,
    setInputValue,
    searchResult,
    setSearchResult,
    detailsResult,
    setDetailsResult,
  } = useContext(AppContext);

  return (
    <>
      <div>InputValue: {inputValue}</div>
      <input
        data-testid="input-test"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div>SearchResult: {JSON.stringify(searchResult)}</div>
      <button
        data-testid="search-test-button"
        onClick={() =>
          setSearchResult({
            totalPages: 1,
            results: [],
          })
        }
      >
        Test Search
      </button>
      <div>
        DetailsResult:{' '}
        {detailsResult === undefined
          ? 'undefined'
          : JSON.stringify(detailsResult)}
      </div>
      <button
        data-testid="details-test-button"
        onClick={() =>
          setDetailsResult({
            createdAt: 'test creation date',
            height: 'test height',
            id: 'test id',
            mass: 'test mass',
            name: 'test name',
            updatedAt: 'test update date',
            url: 'test url',
          })
        }
      >
        Test Details
      </button>
    </>
  );
};

describe('AppContext function tests', () => {
  it('should call setInputValue function', () => {
    const setInputValueMock = jest.fn();
    const testState = { ...initialState, setInputValue: setInputValueMock };

    render(
      <AppContext.Provider value={testState}>
        <ConsumerComponent />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByTestId('input-test'), {
      target: { value: 'new value' },
    });
    expect(setInputValueMock).toHaveBeenCalledWith('new value');
  });

  it('should call setSearchResult function', () => {
    const setSearchResultMock = jest.fn();
    const testState = { ...initialState, setSearchResult: setSearchResultMock };

    render(
      <AppContext.Provider value={testState}>
        <ConsumerComponent />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByTestId('search-test-button'));
    expect(setSearchResultMock).toHaveBeenCalled();
  });

  it('should call setDetailsResult function', () => {
    const setDetailsResultMock = jest.fn();
    const testState = {
      ...initialState,
      setDetailsResult: setDetailsResultMock,
    };

    render(
      <AppContext.Provider value={testState}>
        <ConsumerComponent />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByTestId('details-test-button'));
    expect(setDetailsResultMock).toHaveBeenCalled();
  });
});

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
    const { getByText } = renderWithRouter(<Search />);
    expect(getByText(/loading.../i)).toBeInTheDocument();
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

describe('Details Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Details />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the details information', () => {
    const detailsInfo: DetailsType = {
      name: 'Luke Skywalker',
      createdAt: '2014-12-09T13:50:51.644000Z',
      updatedAt: '2014-12-20T21:17:56.891000Z',
      height: '172',
      mass: '77',
      id: '',
      url: '',
    };

    render(<Details detailsInfo={detailsInfo} />);

    expect(screen.getByText(/Name: Luke Skywalker/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Created: 2014-12-09T13:50:51.644000Z/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Edited: 2014-12-20T21:17:56.891000Z/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
  });

  it('calls onClickClose when the close button is clicked', () => {
    const handleClickClose = jest.fn();
    render(<Details onClickClose={handleClickClose} />);

    fireEvent.click(screen.getByText(/X/i));
    expect(handleClickClose).toHaveBeenCalledTimes(1);
  });

  it('renders without errors when no detailsInfo is provided', () => {
    render(<Details />);
    expect(screen.getByText(/X/i)).toBeInTheDocument();
  });
});
