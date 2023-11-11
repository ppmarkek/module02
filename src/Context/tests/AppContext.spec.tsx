import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { AppContext, initialState } from '../AppContext';
import { useContext } from 'react';
import { resultsMock } from '../../../fixtures/results';

const onInputValueUpdate = jest.fn();
const onSearchResultUpdate = jest.fn();
const onDetailsResultUpdate = jest.fn();

export const TestComponent = () => {
  const {
    inputValue = 'new value',
    setInputValue,
    setSearchResult,
    setDetailsResult,
  } = useContext(AppContext);

  const setInput = () => {
    setInputValue(inputValue);
    onInputValueUpdate;
  };
  const setSearch = () => {
    setSearchResult(resultsMock);
    onSearchResultUpdate;
  };
  const setResult = () => {
    setDetailsResult(resultsMock.results[0]);
    onDetailsResultUpdate;
  };

  return (
    <>
      <button data-testid="test-button-1" onClick={setInput}>
        Test Input
      </button>

      <button data-testid="test-button-2" onClick={setSearch}>
        Test Search
      </button>

      <button data-testid="test-button-3" onClick={setResult}>
        Test Result
      </button>
    </>
  );
};

const renderAppContextProvider = () => (
  <AppContext.Provider value={initialState}>
    <TestComponent />
  </AppContext.Provider>
);

describe('<AppContext>', () => {
  it('should update input value', () => {
    const { getByTestId } = render(renderAppContextProvider());
    const updateInputButton = getByTestId('test-button-1');
    fireEvent.click(updateInputButton);

    expect(onInputValueUpdate).toHaveBeenCalledTimes(0);
  });

  it('should update search result', () => {
    const { getByTestId } = render(renderAppContextProvider());
    const updateSearch = getByTestId('test-button-2');
    fireEvent.click(updateSearch);

    expect(onSearchResultUpdate).toHaveBeenCalledTimes(0);
  });

  it('should update details', () => {
    const { getByTestId } = render(renderAppContextProvider());
    const updateResult = getByTestId('test-button-3');
    fireEvent.click(updateResult);

    expect(onDetailsResultUpdate).toHaveBeenCalledTimes(0);
  });
});
