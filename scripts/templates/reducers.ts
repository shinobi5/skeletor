export default () => {
  return `import { combineReducers } from 'https://cdn.skypack.dev/redux';

const rootReducer = combineReducers({
  state: () => ({})
});

export default rootReducer;
`;
};
