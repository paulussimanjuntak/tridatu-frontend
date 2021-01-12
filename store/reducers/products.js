import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  products: [],
  loading: false,
  aliveArchiving: true,
  error: null,
};

const getProductStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
}

const getProductSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false
  });
}

const getProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const aliveArchiveProductStart = (state, _) => {
  return updateObject(state, {
    error: null,
    aliveArchiving: true,
    loading: true
  });
}

const aliveArchiveProductSuccess = (state, _) => {
  return updateObject(state, {
    aliveArchiving: false,
    loading: false
  });
}

const aliveArchiveProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    aliveArchiving: false,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.GET_ALLPRODUCTS_START:
      return getProductStart(state, action)
    case actionType.GET_ALLPRODUCTS_SUCCESS:
      return getProductSuccess(state, action)
    case actionType.GET_ALLPRODUCTS_FAIL:
      return getProductFail(state, action)

    case actionType.ALIVE_ARCHIVE_START:
      return aliveArchiveProductStart(state, action)
    case actionType.ALIVE_ARCHIVE_SUCCESS:
      return aliveArchiveProductSuccess(state, action)
    case actionType.ALIVE_ARCHIVE_FAIL:
      return aliveArchiveProductFail(state, action)

    default:
      return state;
  }
}

export default reducer
