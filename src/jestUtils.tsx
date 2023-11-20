import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer } from './redux/index';
import { createStore } from '@reduxjs/toolkit';

export const renderWithRedux = (ui: React.JSX.Element, state = {}) => {
  const Wrapper = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => (
    <Router>
      <Provider store={createStore(reducer, state)}>{children}</Provider>
    </Router>
  );

  return render(ui, { wrapper: Wrapper });
};
