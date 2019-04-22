/**
 * Action types
 */

const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const GET_AUTH = "GET_AUTH";
const SET_AUTH = "SET_AUTH";

const GET_WARNING = "GET_WARNING";
const SET_WARNING = "SET_WARNING";

const initialUser = {
  username : '',
  warning  : '',
  auth     : false
};

const axios = require('axios');
const Cookies = require('js-cookie');

/**
 * Action Creators
 */
export const getUser = user => ({ type: GET_USER, user });
export const setUser = user => ({ type: SET_USER, user });
export const getAuth = auth => ({ type: GET_AUTH, auth });
export const setAuth = auth => ({ type: SET_AUTH, auth });
export const getWarning = warning => ({ type: GET_WARNING, warning });
export const setWarning = warning => ({ type: SET_WARNING, warning });

export const loginAuth = (username, password) => async dispatch => {
  try {
    const login = await axios.post(`/api/login`, { username, password });
    if (login.status === 200) {
      const { token } = login.data;
      Cookies.set('token', token);
      dispatch(setAuth());
    } else {
      return false
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Reducer
 */
export default function(state = initialUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_USER:
      return Object.assign({}, state, {
        user: action.user
      });
    case GET_AUTH:
      return action.auth;
    case SET_AUTH:
      return Object.assign({}, state, {
        auth: !state.auth
      });
    case GET_WARNING:
      return action.warning;
    case SET_WARNING:
      return Object.assign({}, state, {
        warning: action.warning
      });
    default:
      return state;
  }
}
