/**
 * Action types
 */

const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_AUTH = "GET_AUTH";
const SET_AUTH = "SET_AUTH";
const GET_ADMIN = "GET_ADMIN";
const SET_ADMIN = "SET_ADMIN";
const GET_BLUEPRINTS = "GET_BLUEPRINTS";
const SET_BLUEPRINTS = "SET_BLUEPRINTS";

const initialUser = {
  user: "Guest",
  isAuth: false,
  isAdminOf: [12, 4, 8, 69],
  blueprints: [],
  usageTime: 0
};

const axios = require('axios');

/**
 * Action Creators
 */
export const getUser = user => ({ type: GET_USER, user });
export const setUser = user => ({ type: SET_USER, user });
export const getAuth = auth => ({ type: GET_AUTH, auth });
export const setAuth = () => ({ type: SET_AUTH });
export const getAdmin = admin => ({ type: GET_ADMIN, admin });
export const setAdmin = admin => ({ type: SET_ADMIN, admin });
export const getBlueprints = blueprint => ({ type: GET_BLUEPRINTS }, blueprint);
export const setBlueprints = blueprint => ({ type: SET_BLUEPRINTS }, blueprint);

export const auth = (username, password) => async dispatch => {
  try {
    const foundUser = await axios.get(`/api/user/query?username=${username}`);
    if (foundUser) {
      dispatch(setUser(foundUser.data.username));
      // dispatch(setBlueprints(foundUser.data.blueprints));
      dispatch(setAuth());
    }
  } catch (err) {
    console.error(err);
    return false
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
    case GET_ADMIN:
      return action.admin;
    case SET_ADMIN:
      return;
    case GET_BLUEPRINTS:
      return action.blueprints
    case SET_BLUEPRINTS:
      console.log('action')
      console.log(action)
      return;
      // return Object.assign({}, state, {
        // blueprints: action.blueprint
      // })
    default:
      return state;
  }
}
