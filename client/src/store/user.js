/**
 * Action types
 */

const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_AUTH = "GET_AUTH";
const SET_AUTH = "SET_AUTH";

const initialUser = {
  username: "",
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

export const loginAuth = (username, password) => async dispatch => {
  try {
    const login = await axios.post(`/api/login`, { username, password });
    if (login.status === 201) {
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
        isAuth: !state.isAuth
      });
    default:
      return state;
  }
}
