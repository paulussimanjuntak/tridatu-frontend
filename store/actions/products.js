import { message } from 'antd'
import axios, { jsonHeaderHandler, signature_exp, resNotification } from "lib/axios";
import * as actionType from "./actionTypes";
import isBoolean from 'validator/lib/isBoolean';

message.config({ maxCount: 1 });

const getProductStart = () => {
  return { type: actionType.GET_ALLPRODUCTS_START }
}

const getProductSuccess = (products) => {
  return { 
    type: actionType.GET_ALLPRODUCTS_SUCCESS,
    products: products
  }
}

const getProductFail = (error) => {
  return {
    type: actionType.GET_ALLPRODUCTS_FAIL,
    error: error
  }
}


const aliveArchiveProductStart = () => {
  return { type: actionType.ALIVE_ARCHIVE_START }
}

const aliveArchiveProductSuccess = () => {
  return { type: actionType.ALIVE_ARCHIVE_SUCCESS, }
}

const aliveArchiveProductFail = (error) => {
  return {
    type: actionType.ALIVE_ARCHIVE_FAIL,
    error: error
  }
}


const loveProductStart = () => {
  return { type: actionType.LOVE_PRODUCT_START }
}

const loveProductSuccess = () => {
  return { type: actionType.LOVE_PRODUCT_SUCCESS }
}

const loveProductFail = (error) => {
  return { 
    type: actionType.LOVE_PRODUCT_FAIL,
    error: error
  }
}

const unloveProductStart = () => {
  return { type: actionType.UNLOVE_PRODUCT_START }
}

const unloveProductSuccess = () => {
  return { type: actionType.UNLOVE_PRODUCT_SUCCESS }
}

const unloveProductFail = (error) => {
  return { 
    type: actionType.UNLOVE_PRODUCT_FAIL,
    error: error
  }
}


const searchNameStart = () => {
  return { type: actionType.SEARCH_NAME_START }
}

const searchNameSuccess = (searchName) => {
  return {
    type: actionType.SEARCH_NAME_SUCCESS,
    searchName: searchName
  }
}

const searchNameFail = (error) => {
  return {
    type: actionType.SEARCH_NAME_FAIL,
    error: error
  }
}


const deleteProductStart = () => {
  return { type: actionType.DELETE_PRODUCTS_START }
}

const deleteProductSuccess = () => {
  return { type: actionType.DELETE_PRODUCTS_SUCCESS }
}

const deleteProductFail = (error) => {
  return { 
    type: actionType.DELETE_PRODUCTS_FAIL,
    error: error
  }
}

export const getProducts = ({ 
  page = 1, per_page = 10, q, live, order_by, p_min, p_max, item_sub_cat, brand, pre_order, condition 
}) => {
  let queryString = {}
  if(page) queryString["page"] = page
  if(per_page) queryString["per_page"] = per_page

  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  if(live && isBoolean(live.toString())) queryString["live"] = live
  else delete queryString["live"]

  if(order_by !== "") queryString["order_by"] = order_by
  else delete queryString["order_by"]

  if(p_min) queryString["p_min"] = p_min
  else delete queryString["p_min"]

  if(p_max) queryString["p_max"] = p_max
  else delete queryString["p_max"]

  // item_sub_cat

  if(brand) queryString["brand"] = brand
  else delete queryString["brand"]

  if(pre_order && isBoolean(pre_order.toString())) queryString["pre_order"] = pre_order
  else delete queryString["pre_order"]

  if(condition && isBoolean(condition.toString())) queryString["condition"] = condition
  else delete queryString["condition"]

  return dispatch => {
    dispatch(getProductStart())
    axios.get(`/products/all-products`, { params: queryString })
      .then(res => {
        dispatch(getProductSuccess(res.data))
      })
      .catch(err => {
        if(err.response.data.detail === signature_exp){
          axios.get(`/products/all-products`, { params: queryString })
            .then(res => {
              dispatch(getProductSuccess(res.data))
            })
            .catch(() => {})
        }
        else {
          dispatch(getProductFail(err.response))
        }
      })
  }
}

export const aliveArchiveProduct = id => {
  return dispatch => {
    dispatch(aliveArchiveProductStart())
    axios.put(`/products/alive-archive/${id}`, null, jsonHeaderHandler())
      .then((res) => {
        message.success({ 
          content: res.data.detail, 
          style: { marginTop: '10vh' },
        });
        dispatch(aliveArchiveProductSuccess())
      })
      .catch(err => {
        dispatch(aliveArchiveProductFail(err.response))
      })
  }
}

export const loveProduct = id => {
  return dispatch => {
    dispatch(loveProductStart())
    axios.post(`/wishlists/love/${id}`, null, jsonHeaderHandler())
      .then(res => {
        message.success({ 
          content: res.data.detail, 
          style: { marginTop: '8vh' },
        });
        dispatch(loveProductSuccess())
      })
      .catch(err => {
        dispatch(loveProductFail(err.response))
      })
  }
}

export const unloveProduct = id => {
  return dispatch => {
    dispatch(unloveProductStart())
    axios.delete(`/wishlists/unlove/${id}`, jsonHeaderHandler())
      .then(res => {
        message.success({ 
          content: res.data.detail, 
          style: { marginTop: '8vh' },
        });
        dispatch(unloveProductSuccess())
      })
      .catch(err => {
        dispatch(unloveProductFail(err.response))
      })
  }
}

export const searchName = q => {
  return dispatch => {
    dispatch(searchNameStart())
    axios.get(`/products/search-by-name?q=${q}&limit=10`)
      .then(res => {
        let names = res.data.map(obj => {
          obj['value'] = obj['value'].replace(new RegExp(q, "gi"), (match) => `<b class="text-danger">${match}</b>`)
          return obj 
        })
        dispatch(searchNameSuccess(names))
      })
      .catch(err => {
        dispatch(searchNameSuccess([]))
        dispatch(searchNameFail(err.response))
      })
  }
}

export const deleteProduct = (id, router) => {
  return dispatch => {
    dispatch(deleteProductStart())
    axios.delete(`/products/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        const resDetail = res.data.detail
        const notFound = "Product not found!"

        if(resDetail === notFound){
          resNotification("error", "Error", resDetail)
        } else {
          resNotification("success", "Success", resDetail)
          dispatch(getProducts({ ...router }))
          dispatch(deleteProductSuccess())
        }
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp){
          resNotification("success", "Success", "Successfully delete the product.")
          dispatch(getProducts({ ...router }))
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(deleteProductFail(errDetail))
          }
        }
      })
  }
}
