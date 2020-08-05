export default () => {
  return `import { createStore, applyMiddleware, compose } from 'https://cdn.skypack.dev/redux';
import thunk from 'https://cdn.skypack.dev/redux-thunk';

import rootReducer from './reducers';

const middleware = applyMiddleware(thunk);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  reduxDevTools(middleware)
);

export default store;
`;
};
