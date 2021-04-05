import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  listPromoName: [],
  loading: false,
  error: null,
};

const searchPromoNameStart  = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
}

const searchPromoNameSuccess  = (state, action) => {
  return updateObject(state, {
    listPromoName: action.payload,
    loading: false,
  });
}

const searchPromoNameFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.SEARCH_PROMO_NAME_START :
      return searchPromoNameStart(state, action)
    case actionType.SEARCH_PROMO_NAME_SUCCESS:
      return searchPromoNameSuccess(state, action)
    case actionType.SEARCH_PROMO_NAME_FAIL:
      return searchPromoNameFail(state, action)

    default:
      return state
  }
}

export default reducer
