import {
  USER_SET_AUTH
} from '../constants';

const initialState = {
  user: {
    isAuth: false
  }
};

const appReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case USER_SET_AUTH:
      return Object.assign({}, state, {
        isAuth: action.payload
      });
    default:
      return state;
  }
};

export default appReducer;
