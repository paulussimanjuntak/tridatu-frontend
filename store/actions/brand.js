import axios from "lib/axios";
import * as actionType from "./actionTypes";

const getBrandStart = () => {
  return { type: actionType.GET_BRAND_START };
};

export const getBrandSuccess = (brand) => {
  return {
    type: actionType.GET_BRAND_SUCCESS,
    brand: brand,
  };
};

const getBrandFail = (error) => {
  return {
    type: actionType.GET_BRAND_FAIL,
    error: error
  }
}

const getMultipleBrandStart = () => {
  return { type: actionType.GET_MULTIPLE_BRAND_START }
}

export const getMultipleBrandSuccess = (payload) => {
  return {
    type: actionType.GET_MULTIPLE_BRAND_SUCCESS,
    payload: payload
  }
}

const getMultipleBrandFail = (error) => {
  return {
    type: actionType.GET_MULTIPLE_BRAND_FAIL,
    error: error
  }
}

export const getBrand = (q = "") => {
  let queryString = {}

  if(q !== "" && q !== undefined) queryString["q"] = q.q
  else delete queryString["q"]

  return dispatch => {
    dispatch(getBrandStart())
    axios.get("/brands/all-brands", { params: queryString })
      .then(res => {
        dispatch(getBrandSuccess(res.data))
      })
      .catch(err => {
        dispatch(getBrandFail(err.response))
      })
  }
}

export const getMultipleBrand = ({ list_id = [] }) => {
  return dispatch => {
    dispatch(getMultipleBrandStart())
    const data = { list_id: list_id }
    axios.post(`/brands/get-multiple-brand`, data)
      .then(res => {
        dispatch(getMultipleBrandSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp){
          axios.post(`/brands/get-multiple-brand`, data)
            .then(res => {
              dispatch(getMultipleBrandSuccess(res.data))
            })
            .catch(() => {})
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(getMultipleBrandFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(getMultipleBrandFail(errDetail[0].msg))
          }
        }
      })
  }
}
