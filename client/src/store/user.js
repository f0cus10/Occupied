/**
 * Action types
 */

const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_AUTH = "GET_AUTH";
const SET_AUTH = "SET_AUTH";
const GET_ADMIN = "GET_ADMIN";
const SET_ADMIN = "SET_ADMIN";

const initialUser = {
  user: "Guest",
  isAuth: false,
  isAdminOf: [12, 4, 8, 69]
};

/**
 * Action Creators
 */
export const getUser = user => ({ type: GET_USER, user });
export const setUser = user => ({ type: SET_USER, user });
export const getAuth = auth => ({ type: GET_AUTH, auth });
export const setAuth = () => ({ type: SET_AUTH });
export const getAdmin = admin => ({ type: GET_ADMIN, admin });
export const setAdmin = admin => ({ type: SET_ADMIN, admin });

export const auth = (username, password) => async dispatch => {};

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
    default:
      return state;
  }
}
