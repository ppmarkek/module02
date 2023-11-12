import { Details } from "../../Details/Details";
import { fireEvent, render, screen } from "@testing-library/react";
import { resultsMock } from "../../../../fixtures/results";
import React from "react";
import { SearchWrapper } from "../SearchWrapper";

const newSearchEvent = jest.fn();
const setInputValueEvent = jest.fn();
const setItemsPageEvent = jest.fn();

const draw = () => {
  return (
    <SearchWrapper
      inputValue="test input"
      itemsPage="10"
      newSearch={newSearchEvent}
      setItemsPage={setItemsPageEvent}
      setInputValue={setInputValueEvent}
    >
      <>
        <button data-testid="test-button-1" onClick={newSearchEvent}>
          Test Input
        </button>

        <button data-testid="test-button-2" onClick={setItemsPageEvent}>
          Test Search
        </button>

        <button data-testid="test-button-3" onClick={setInputValueEvent}>
          Test Result
        </button>
      </>
    </SearchWrapper>
  );
};

describe("Details Component", () => {
  beforeAll(() => {
    console.error = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  it("renders correctly", () => {
    const component = render(draw());

    expect(component).toMatchSnapshot();
  });

  it("calls onClickClose when the close button is clicked", () => {
    const { getByTestId } = render(draw());
    const updateInputButton = getByTestId("test-button-1");
    fireEvent.click(updateInputButton);

    expect(newSearchEvent).toHaveBeenCalledTimes(1);
  });

  it("calls onClickClose when the close button is clicked", () => {
    const { getByTestId } = render(draw());
    const updateInputButton = getByTestId("test-button-2");
    fireEvent.click(updateInputButton);

    expect(setItemsPageEvent).toHaveBeenCalledTimes(1);
  });

  it("calls onClickClose when the close button is clicked", () => {
    const { getByTestId } = render(draw());
    const updateInputButton = getByTestId("test-button-3");
    fireEvent.click(updateInputButton);

    expect(setInputValueEvent).toHaveBeenCalledTimes(1);
  });

  it("calls onClickClose when the close button is clicked", () => {
    const { getByTestId } = render(draw());
    const updateInputButton = getByTestId("error-input");
    fireEvent.click(updateInputButton);

    expect(console.error).toHaveBeenCalled();
  });

  it("calls setInputValue on input change", () => {
    const { getByTestId } = render(draw());
    const input = getByTestId("search-input");
    fireEvent.change(input, { target: { value: "new input" } });

    expect(setInputValueEvent).toHaveBeenCalledWith("new input");
  });
});
