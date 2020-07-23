export default () => {
  return `import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: () => ({})
});

export default rootReducer;
`;
};
