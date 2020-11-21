import { combineReducers } from "redux";
import authReducer from "./auth";
import addressReducer from "./address";
import outletReducer from "./outlet";

const reducers = {
  auth: authReducer,
  address: addressReducer,
  outlet: outletReducer,
};

export default combineReducers(reducers);
