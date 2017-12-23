import {
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_AUTH_ERROR
} from '../constants';

const initialState = {
  user: {
    isAuth: false,
    signupSuccess: false,
    authError: null
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
    case USER_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      }
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupSuccess: true
      });
    case USER_LOGIN_SUCCESS: 
      return {
        ...state,
        authError: false,
        isAuth: true,
        signupSuccess: true
      }
    case DESTORY_USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signupSuccess: false
      });
    default:
      return state;
  }
};

export default userReducer;
