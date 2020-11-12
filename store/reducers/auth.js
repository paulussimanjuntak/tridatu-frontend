import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  user: null,
  error: null,
};

/*
 * GET USER
 */
const getUserStart = (state, _) => {
  return updateObject(state, {
    error: null,
  });
};

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
  });
};

const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

/*
 * AUTH
 */
const authLogout = (state, _) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET USER */
    case actionType.GET_USER_START:
      return getUserStart(state, action);
    case actionType.GET_USER_SUCCESS:
      return getUserSuccess(state, action);
    case actionType.GET_USER_FAIL:
      return getUserFail(state, action);

    /* LOGOUT */
    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
