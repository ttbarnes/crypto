import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS
} from '../constants';

const initialState = {
  user: {
    isAuth: false,
    signupSuccess: false
  }
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case USER_SET_AUTH:
      return Object.assign({}, state, {
        isAuth: action.payload
      });
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupSuccess: true
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer
})

export default rootReducer;
