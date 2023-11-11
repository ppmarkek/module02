import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResults } from '../SearchResults';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { resultsMock } from '../../../../fixtures/results';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SearchResults Component', () => {
  it('displays a card when isLoading is false, searchResult is not null, and searchValue is true', () => {
    const { getByTestId } = render(
      <Router>
        <SearchResults
          isLoading={false}
          searchResult={resultsMock}
          searchValue={true}
          getDetailsData={() => Promise.resolve()}
          closeDetails={() => {}}
        />
      </Router>
    );

    const card = getByTestId('result-card-1');
    expect(card).toBeInTheDocument();
  });

  it('displays loading text when isLoading is true', () => {
    render(
      <Router>
        <SearchResults
          isLoading={true}
          searchResult={null}
          searchValue={false}
          getDetailsData={() => Promise.resolve()}
          closeDetails={() => {}}
        />
      </Router>
    );
    expect(screen.getByTestId('loading-text')).toHaveTextContent('Loading...');
  });

  it('calls getDetailsData and navigate when a card is clicked', () => {
    const mockGetDetailsData = jest.fn();

    render(
      <Router>
        <SearchResults
          isLoading={false}
          searchResult={resultsMock}
          searchValue={true}
          getDetailsData={mockGetDetailsData}
          closeDetails={() => {}}
        />
      </Router>
    );

    const firstCard = screen.getByTestId('result-card-1');
    fireEvent.click(firstCard);

    expect(mockGetDetailsData).toHaveBeenCalledWith('test-id');
  });
});
