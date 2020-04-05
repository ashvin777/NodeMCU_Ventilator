import {createStore, compose, applyMiddleware} from 'redux';

import reducers from './reducers';

// dev tools middleware
const composeSetup =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// store
const store = createStore(reducers, composeSetup(applyMiddleware()));

export default store;
