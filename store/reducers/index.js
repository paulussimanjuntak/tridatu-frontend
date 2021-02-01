import { combineReducers } from "redux";
import authReducer from "./auth";
import addressReducer from "./address";
import outletReducer from "./outlet";
import brandReducer from "./brand";
import categoriesRecuder from "./categories"
import productsRecuder from "./products"
import shippingRecuder from "./shipping"

import layoutReducer from "./layout"

const reducers = {
  auth: authReducer,
  address: addressReducer,
  outlet: outletReducer,
  brand: brandReducer,
  categories: categoriesRecuder,
  products: productsRecuder,
  shipping: shippingRecuder,
  layout: layoutReducer
};

export default combineReducers(reducers);
