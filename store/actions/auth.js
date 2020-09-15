import * as actionType from "./actionTypes";

export const authSuccess = () => {
  return { type: actionType.AUTH_SUCCESS };
};

export const logout = () => {
  return { type: actionType.LOGOUT };
};
