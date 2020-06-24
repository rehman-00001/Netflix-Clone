import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { initializeStore } from '../../Redux/store';

/**
 * Method: renderX
 *
 * To render a component that is connected to the redux store
 */
const renderX = (ui, appState) => {
  const store = initializeStore(appState);
  const component = (
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
  return { ...render(component), store };
};

// re-export everything
export * from '@testing-library/react';

export { renderX };
