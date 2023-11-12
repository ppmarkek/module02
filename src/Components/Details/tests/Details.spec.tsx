import { Details } from '../../Details/Details';
import { fireEvent, render } from '@testing-library/react';
import { resultsMock } from '../../../../fixtures/results';
import React from 'react';

const itemDetails = resultsMock.results[0];
const handleClickClose = jest.fn();

const draw = () => {
  return <Details detailsInfo={itemDetails} onClickClose={handleClickClose} />;
};

describe('Details Component', () => {
  it('renders correctly', () => {
    const component = draw();

    expect(component).toMatchSnapshot();
  });

  it('calls onClickClose when the close button is clicked', () => {
    const { getByTestId } = render(draw());
    const closeIcon = getByTestId('close-icon');
    fireEvent.click(closeIcon);

    expect(handleClickClose).toHaveBeenCalledTimes(1);
  });
});
