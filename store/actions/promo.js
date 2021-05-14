import { message } from 'antd'
import axios, { jsonHeaderHandler, signature_exp, resNotification } from "lib/axios";
import * as actionType from "./actionTypes";
import isIn from 'validator/lib/isIn'

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

const getPromoStart = () => {
  return { type: actionType.GET_PROMO_START }
}

const getPromoSuccess = (payload) => {
  return { 
    type: actionType.GET_PROMO_SUCCESS,
    payload: payload
  }
}

const getPromoFail = (error) => {
  return { 
    type: actionType.GET_PROMO_FAIL,
    error: error
  }
}

const deletePromoStart = () => {
  return { type: actionType.DELETE_PROMO_START }
}

const deletePromoSuccess = () => {
  return { type: actionType.DELETE_PROMO_SUCCESS }
}

const deletePromoFail = (error) => {
  return { 
    type: actionType.DELETE_PROMO_FAIL,
    error: error
  }
}

export const getPromoSlugStart = () => {
  return { type: actionType.GET_PROMO_SLUG_START }
}

export const getPromoSlugSuccess = (payload) => {
  return {
    type: actionType.GET_PROMO_SLUG_SUCCESS,
    payload: payload
  }
}

export const getPromoSlugFail = (error) => {
  return {
    type: actionType.GET_PROMO_SLUG_FAIL,
    error: error
  }
}

const deletePromoCodeStart = () => {
  return { type: actionType.DELETE_PROMO_CODE_START }
}

const deletePromoCodeSuccess = () => {
  return { type: actionType.DELETE_PROMO_CODE_SUCCESS }
}

const deletePromoCodeFail = (error) => {
  return { 
    type: actionType.DELETE_PROMO_CODE_FAIL,
    error: error
  }
}

const getPromoCodeApplyStart = () => {
  return { type: actionType.GET_PROMO_CODE_APPLY_START }
}

export const getPromoCodeApplySuccess = (payload) => {
  return {
    type: actionType.GET_PROMO_CODE_APPLY_SUCCESS,
    payload: payload
  }
}

const getPromoCodeApplyFail = (error) => {
  return { 
    type: actionType.GET_PROMO_CODE_APPLY_FAIL,
    error: error
  }
}


export const deletePromoCode = (id, slug) => {
  return dispatch => {
    dispatch(deletePromoCodeStart())
    axios.delete(`/promo-codes/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        const resDetail = res.data.detail
        const notFound = ["Promo code not found!", "Kode promo tidak ditemukan!"]
        if(isIn(resDetail, notFound)){
          resNotification("error", "Error", resDetail)
        } else {
          resNotification("success", "Success", resDetail)
          dispatch(getSlugPromo({ slug: slug, is_code: true, is_other: false }))
          dispatch(deletePromoCodeSuccess())
        }
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp){
          resNotification("success", "Success", "Successfully delete the promo-code.")
          dispatch(getSlugPromo({ slug: slug, is_code: true, is_other: false }))
          dispatch(deletePromoCodeSuccess())
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(deletePromoCodeFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(deletePromoCodeFail(errDetail[0].msg))
          }
        }
      })
  }
}

export const deletePromo = (id, router) => {
  return dispatch => {
    dispatch(deletePromoStart())
    axios.delete(`/promos/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        const resDetail = res.data.detail
        const notFound = ["Promo not found!", "Promo tidak ditemukan!"]
        if(isIn(resDetail, notFound)){
          resNotification("error", "Error", resDetail)
        } else {
          resNotification("success", "Success", resDetail)
          dispatch(getPromos({ ...router }))
          dispatch(deletePromoSuccess())
        }
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp){
          resNotification("success", "Success", "Successfully delete the promo.")
          dispatch(getPromos({ ...router }))
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(deletePromoFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(deletePromoFail(errDetail[0].msg))
          }
        }
      })
  }
}

export const getPromoCodeApply = (promo_code_id) => {
  return dispatch => {
    dispatch(getPromoCodeApplyStart())
    axios.get(`/promo-codes/get-promo-apply/${promo_code_id}`)
      .then(res => {
        dispatch(getPromoCodeApplySuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp){
          axios.get(`/promo-codes/get-promo-apply/${promo_code_id}`)
            .then(res => {
              dispatch(getPromoCodeApplySuccess(res.data))
            })
            .catch(() => {})
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(getPromoCodeApplyFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(getPromoCodeApplyFail(errDetail[0].msg))
          }
        }
      })
  }
}

export const getSlugPromo = ({ slug, is_code = true, is_other = true }) => {
  return dispatch => {
    dispatch(getPromoSlugStart())
    axios.get(`/promos/${slug}`, { params: { is_code: is_code, is_other: is_other } })
      .then(res => {
        dispatch(getPromoSlugSuccess(res.data))
      })
      .catch(err => {
        if(err.response.data.detail === signature_exp){
          axios.get(`/promos/${slug}`, { params: { is_code: is_code, is_other: is_other } })
            .then(res => {
              dispatch(getPromoSlugSuccess(res.data))
            })
            .catch(() => {})
        } else {
          dispatch(getPromoSlugFail(err.response))
        }
      })
  }
}

export const getPromos = ({
  page = 1, per_page = 10, q, status
}) => {

  let queryString = {}
  if(page) queryString["page"] = page
  if(per_page) queryString["per_page"] = per_page

  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  if(status) queryString["status"] = status
  else delete queryString["status"]

  return dispatch => {
    dispatch(getPromoStart())
    axios.get('/promos/all-promos', { params: queryString })
      .then(res => {
        dispatch(getPromoSuccess(res.data))
      })
      .catch(err => {
        if(err.response.data.detail === signature_exp){
          axios.get('/promos/all-promos', { params: queryString })
            .then(res => {
              dispatch(getPromoSuccess(res.data))
            })
            .catch(() => {})
        }
        else{
          dispatch(getPromoFail(err.response))
        }
      })
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
