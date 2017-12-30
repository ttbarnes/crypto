// global
export const API_BASE = 'http://localhost:8080/api';
export const API_ROOT = 'http://localhost:8080/api/poc';
export const API_ROOT_BITTREX = `${API_ROOT}/bittrex`;
export const API_ROOT_GDAX = `${API_ROOT}/gdax`;

// dummy data / config
export const EXCHANGES = [
  'Bitfinex',
  'Bittrex',
  'GDAX',
  'Something 4'
];

// actions
export const USER_SET_AUTH = 'USER_SET_AUTH';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const DESTORY_USER_SIGNUP_SUCCESS = 'DESTORY_USER_SIGNUP_SUCCESS';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_ERROR = 'USER_DATA_ERROR';

export const PROMISE_EXCHANGE_LOADING = 'PROMISE_EXCHANGE_LOADING';
export const PROMISE_EXCHANGE_SUCCESS = 'PROMISE_EXCHANGE_SUCCESS';
export const PROMISE_EXCHANGE_ERROR = 'PROMISE_EXCHANGE_ERROR';
