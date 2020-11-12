import nookies from "nookies";
import axios, { jsonHeaderHandler, refreshHeader } from "lib/axios";
import * as actionType from "./actionTypes";

/*
 * LOGOUT
 */
const authLogout = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

/*
 * GET USER ACTIONS
 */
const getUserStart = () => {
  return {
    type: actionType.GET_USER_START,
  };
};
const getUserSuccess = (user) => {
  return {
    type: actionType.GET_USER_SUCCESS,
    user: user,
  };
};
const getUserFail = (error) => {
  return {
    type: actionType.GET_USER_FAIL,
    error: error,
  };
};

/*
 * GET USER FUNCTION
 */
export const getUser = () => {
  return (dispatch) => {
    dispatch(getUserStart());
    // axios get user success
    dispatch(
      getUserSuccess({
        username: "rio victoria",
        email: "rio@victoria.brazile",
      })
    );
    // axios get user fail
    // dispatch(getUserFail())
  };
};

/*
 * CHECK USER IS LOGIN OR NOT
 */
export const authCheckState = (ctx) => {
  return (dispatch) => {
    const cookies = nookies.get(ctx);
    const { csrf_access_token, csrf_refresh_token } = cookies;
    if (csrf_access_token && csrf_refresh_token) {
      dispatch(getUser()); // when csrf_access_token && csrf_refresh_token is true it will get the user data
    } else {
      dispatch(logout()); // if not it will logout and delete the cookies and global state
    }
  };
};

/*
 * LOGOUT FUNCTION
 */
export const logout = () => {
  return (dispatch) => {
    const cookies = nookies.get();
    const { csrf_access_token, csrf_refresh_token } = cookies;

    if (csrf_access_token) {
      axios
        .delete("/users/access-revoke", jsonHeaderHandler())
        .then(() => {
          nookies.destroy(null, "csrf_access_token");
        })
        .catch(() => {
          nookies.destroy(null, "csrf_access_token");
        })
        .then(() => {
          dispatch(authLogout());
        });
    }
    if (csrf_refresh_token) {
      axios
        .delete("/users/refresh-revoke", refreshHeader())
        .then(() => {
          nookies.destroy(null, "csrf_refresh_token");
        })
        .catch(() => {
          nookies.destroy(null, "csrf_refresh_token");
        })
        .then(() => {
          dispatch(authLogout());
        });
    }
  };
};
