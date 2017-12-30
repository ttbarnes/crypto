import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user';
import uiStateReducer from './uiState';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  uiState: uiStateReducer
})

export default rootReducer;
