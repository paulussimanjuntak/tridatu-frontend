import { message } from 'antd'
import axios, { jsonHeaderHandler, signature_exp } from "lib/axios";
import * as actionType from "./actionTypes";

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

export const getProducts = ({ page = 1, per_page = 10, live, order_by, q, p_min, p_max, item_sub_cat, brand, pre_order, condition }) => {
  let rest = ""
  if(live) rest = `&live=${live}`
  if(order_by) rest = rest + `&order_by=${order_by}`
  if(q) rest = rest + `&q=${q}`
  if(p_min) rest = rest + `&p_min=${p_min}` 
  if(p_max) rest = rest + `&p_max=${p_max}` 
  if(item_sub_cat) rest = rest + `&item_sub_cat=${item_sub_cat}` 
  if(brand) rest = rest + `&brand=${brand}` 
  if(pre_order) rest = rest + `&pre_order=${pre_order}` 
  if(condition) rest = rest + `&condition=${condition}` 

  return dispatch => {
    dispatch(getProductStart())
    axios.get(`/products/all-products?page=${page}&per_page=${per_page}${rest}`)
      .then(res => {
        dispatch(getProductSuccess(res.data))
      })
      .catch(err => {
        console.log(err.response)
        if(err.response.data.detail === signature_exp){
          axios.get(`/products/all-products?page=${page}&per_page=${per_page}${rest}`)
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
