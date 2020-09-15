import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  auth: false
}

const authSucces = (state, action) => {
  return updateObject(state, {
    auth: true
  })
}

const logout = (state, action) => {
  return updateObject(state, {
    auth: false
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.AUTH_SUCCESS:
      return authSucces(state, action)
    case actionType.LOGOUT:
      return logout(state, action)

    default:
      return state;
  }
};

export default reducer;
