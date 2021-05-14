import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  brand: [],
  multipleBrandData: [],
  loading: false,
  error: null,
};

const getBrandStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getBrandSuccess = (state, action) => {
  return updateObject(state, {
    brand: action.brand,
    loading: false,
  });
};

const getBrandFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getMultipleBrandStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const getMultipleBrandSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    multipleBrandData: action.payload
  })
}

const getMultipleBrandFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.GET_BRAND_START:
      return getBrandStart(state, action)
    case actionType.GET_BRAND_SUCCESS:
      return getBrandSuccess(state, action)
    case actionType.GET_BRAND_FAIL:
      return getBrandFail(state, action)

    case actionType.GET_MULTIPLE_BRAND_START:
      return getMultipleBrandStart(state, action)
    case actionType.GET_MULTIPLE_BRAND_SUCCESS:
      return getMultipleBrandSuccess(state, action)
    case actionType.GET_MULTIPLE_BRAND_FAIL:
      return getMultipleBrandFail(state, action)

    default:
      return state
  }
}

export default reducer
