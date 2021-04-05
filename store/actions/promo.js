import { message } from 'antd'
import axios, { jsonHeaderHandler, signature_exp, resNotification } from "lib/axios";
import * as actionType from "./actionTypes";

const searchPromoNameStart = () => {
  return { type: actionType.SEARCH_PROMO_NAME_START }
}

const searchPromoNameSuccess = payload => {
  return {
    type: actionType.SEARCH_PROMO_NAME_SUCCESS,
    payload: payload
  }
}

const searchPromoNameFail = (error) => {
  return {
    type: actionType.SEARCH_PROMO_NAME_FAIL,
    error: error
  }
}

export const searchPromoName = ({ q, limit = 10 }) => {
  let queryString = { q: q, limit: limit }

  return dispatch => {
    dispatch(searchPromoNameStart())
    axios.get('/promos/search-by-name', { params: queryString })
      .then(res => {
        dispatch(searchPromoNameSuccess(res.data))
      })
      .catch(err => {
        dispatch(searchPromoNameSuccess([]))
        dispatch(searchPromoNameFail(err.response))
      })
  }
}
