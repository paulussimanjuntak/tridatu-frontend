import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  promos: [],
  listPromoName: [],
  promoSlug: {},
  applicablePromo: {},
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

const getPromoStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const getPromoSuccess = (state, action) => {
  return updateObject(state, {
    promos: action.payload,
    loading: false
  })
}

const getPromoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const deletePromoStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: false,
  });
}

const deletePromoSuccess = (state, _) => {
  return updateObject(state, {
    loading: false,
  })
}

const deletePromoFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}

const getPromoSlugStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const getPromoSlugSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    promoSlug: action.payload
  })
}

const getPromoSlugFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}

const getPromoCodeApplyStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const getPromoCodeApplySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    applicablePromo: action.payload
  })
}

const getPromoCodeApplyFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.SEARCH_PROMO_NAME_START:
      return searchPromoNameStart(state, action)
    case actionType.SEARCH_PROMO_NAME_SUCCESS:
      return searchPromoNameSuccess(state, action)
    case actionType.SEARCH_PROMO_NAME_FAIL:
      return searchPromoNameFail(state, action)

    case actionType.GET_PROMO_START:
      return getPromoStart(state, action)
    case actionType.GET_PROMO_SUCCESS:
      return getPromoSuccess(state, action)
    case actionType.GET_PROMO_FAIL:
      return getPromoFail(state, action)

    case actionType.DELETE_PROMO_START:
      return deletePromoStart(state, action)
    case actionType.DELETE_PROMO_SUCCESS:
      return deletePromoSuccess(state, action)
    case actionType.DELETE_PROMO_FAIL:
      return deletePromoFail(state, action)
      
    case actionType.GET_PROMO_SLUG_START:
      return getPromoSlugStart(state, action)
    case actionType.GET_PROMO_SLUG_SUCCESS:
      return getPromoSlugSuccess(state, action)
    case actionType.GET_PROMO_SLUG_FAIL:
      return getPromoSlugFail(state, action)

    case actionType.GET_PROMO_CODE_APPLY_START:
      return getPromoCodeApplyStart(state, action)
    case actionType.GET_PROMO_CODE_APPLY_SUCCESS:
      return getPromoCodeApplySuccess(state, action)
    case actionType.GET_PROMO_CODE_APPLY_FAIL:
      return getPromoCodeApplyFail(state, action)

    default:
      return state
  }
}

export default reducer
