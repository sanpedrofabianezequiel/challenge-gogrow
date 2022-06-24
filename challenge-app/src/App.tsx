import React from 'react';
import { AppRouter } from './application/routers';
import { Provider } from 'react-redux';
import { store } from './application/redux';

function App() {
  return (
    <Provider store={store}>
    <AppRouter/>
    </Provider>
  );
}

export default App;
