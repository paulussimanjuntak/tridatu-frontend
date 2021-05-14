import axios from "lib/axios";
import * as actionType from "./actionTypes";

/* CATEGORIES */
const getCategoriesStart = () => {
  return { type: actionType.GET_CATEGORIES_START };
};

export const getCategoriesSuccess = (categories) => {
  return {
    type: actionType.GET_CATEGORIES_SUCCESS,
    categories: categories,
  };
};

const getCategoriesFail = (error) => {
  return {
    type: actionType.GET_CATEGORIES_FAIL,
    error: error
  }
}

/* SUB CATEGORIES */
const getSubCategoriesStart = () => {
  return { type: actionType.GET_SUBCATEGORIES_START };
};

export const getSubCategoriesSuccess = (subcategories) => {
  return {
    type: actionType.GET_SUBCATEGORIES_SUCCESS,
    subcategories: subcategories,
  };
};

const getSubCategoriesFail = (error) => {
  return {
    type: actionType.GET_SUBCATEGORIES_FAIL,
    error: error
  }
}


/* ITEM SUB CATEGORIES */
const getItemSubCategoriesStart = () => {
  return { type: actionType.GET_ITEMSUBCATEGORIES_START };
};

export const getItemSubCategoriesSuccess = (itemsubcategories) => {
  return {
    type: actionType.GET_ITEMSUBCATEGORIES_SUCCESS,
    itemsubcategories: itemsubcategories,
  };
};

const getItemSubCategoriesFail = (error) => {
  return {
    type: actionType.GET_ITEMSUBCATEGORIES_FAIL,
    error: error
  }
}

/* ALL CATEGORIES */
const getAllCategoriesStart = () => {
  return { type: actionType.GET_ALLCATEGORIES_START };
};

export const getAllCategoriesSuccess = (allCategories) => {
  return {
    type: actionType.GET_ALLCATEGORIES_SUCCESS,
    allCategories: allCategories,
  };
};

const getAllCategoriesFail = (error) => {
  return {
    type: actionType.GET_ALLCATEGORIES_FAIL,
    error: error
  }
}


/* MULTIPLE DATA */
const getMultipleCategoriesStart = () => {
  return { type: actionType.GET_MULTIPLE_CATEGORIES_START }
}

export const getMultipleCategoriesSuccess = (payload) => {
  return {
    type: actionType.GET_MULTIPLE_CATEGORIES_SUCCESS,
    payload: payload
  }
}

const getMultipleCategoriesFail = (error) => {
  return {
    type: actionType.GET_MULTIPLE_CATEGORIES_FAIL,
    error: error
  }
}


const getMultipleSubCategoriesStart = () => {
  return { type: actionType.GET_MULTIPLE_SUBCATEGORIES_START }
}

export const getMultipleSubCategoriesSuccess = (payload) => {
  return {
    type: actionType.GET_MULTIPLE_SUBCATEGORIES_SUCCESS,
    payload: payload
  }
}

const getMultipleSubCategoriesFail = (error) => {
  return {
    type: actionType.GET_MULTIPLE_SUBCATEGORIES_FAIL,
    error: error
  }
}


const getMultipleItemSubCategoriesStart = () => {
  return { type: actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_START }
}

export const getMultipleItemSubCategoriesSuccess = (payload) => {
  return {
    type: actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_SUCCESS,
    payload: payload
  }
}

const getMultipleItemSubCategoriesFail = (error) => {
  return {
    type: actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_FAIL,
    error: error
  }
}


export const getCategories = (with_sub, q) => {
  return dispatch => {
    dispatch(getCategoriesStart())
    if(q){
      axios.get(`/categories/all-categories?with_sub=${with_sub}&q=${q}`)
        .then(res => {
          dispatch(getCategoriesSuccess(res.data))
        })
        .catch(err => {
          dispatch(getCategoriesFail(err.response))
        })
    } else {
      axios.get(`/categories/all-categories?with_sub=${with_sub}`)
        .then(res => {
          dispatch(getCategoriesSuccess(res.data))
        })
        .catch(err => {
          dispatch(getCategoriesFail(err.response))
        })
    }
  }
}

export const getSubCategories = () => {
  return dispatch => {
    dispatch(getSubCategoriesStart())
    axios.get("/sub-categories/all-sub-categories")
      .then(res => {
        dispatch(getSubCategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(getSubCategoriesFail(err.response))
      })
  }
}

export const getItemSubCategories = () => {
  return dispatch => {
    dispatch(getItemSubCategoriesStart())
    axios.get("/item-sub-categories/all-item-sub-categories")
      .then(res => {
        dispatch(getItemSubCategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(getItemSubCategoriesFail(err.response))
      })
  }
}

export const getAllCategories = (q) => {
  return dispatch => {
    dispatch(getAllCategoriesStart())
    if(q){
      axios.get(`/categories/?q=${q}`)
        .then(res => {
          dispatch(getAllCategoriesSuccess(res.data))
        })
        .catch(err => {
          dispatch(getAllCategoriesFail(err.response))
        })
    } else {
      axios.get(`/categories/`)
        .then(res => {
          dispatch(getAllCategoriesSuccess(res.data))
        })
        .catch(err => {
          dispatch(getAllCategoriesFail(err.response))
        })
    }
  }
}

export const getMultipleCategories = ({ list_id = [] }) => {
  return dispatch => {
    dispatch(getMultipleCategoriesStart())
    const data = { list_id: list_id }
    axios.post(`/categories/get-multiple-category`, data)
      .then(res => {
        dispatch(getMultipleCategoriesSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp){
          axios.post(`/categories/get-multiple-category`, data)
            .then(res => {
              dispatch(getMultipleCategoriesSuccess(res.data))
            })
            .catch(() => {})
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(getMultipleCategoriesFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(getMultipleCategoriesFail(errDetail[0].msg))
          }
        }
      })
  }
}

export const getMultipleSubCategories = ({ list_id = [] }) => {
  return dispatch => {
    dispatch(getMultipleSubCategoriesStart())
    const data = { list_id: list_id }
    axios.post(`/sub-categories/get-multiple-sub-category`, data)
      .then(res => {
        dispatch(getMultipleSubCategoriesSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp){
          axios.post(`/sub-categories/get-multiple-sub-category`, data)
            .then(res => {
              dispatch(getMultipleSubCategoriesSuccess(res.data))
            })
            .catch(() => {})
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(getMultipleSubCategoriesFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(getMultipleSubCategoriesFail(errDetail[0].msg))
          }
        }
      })
  }
}

export const getMultipleItemSubCategories = ({ list_id = [] }) => {
  return dispatch => {
    dispatch(getMultipleItemSubCategoriesStart())
    const data = { list_id: list_id }
    axios.post(`/item-sub-categories/get-multiple-item-sub-category`, data)
      .then(res => {
        dispatch(getMultipleItemSubCategoriesSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp){
          axios.post(`/item-sub-categories/get-multiple-item-sub-category`, data)
            .then(res => {
              dispatch(getMultipleItemSubCategoriesSuccess(res.data))
            })
            .catch(() => {})
        } else {
          if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
            resNotification("error", "Error", errDetail)
            dispatch(getMultipleItemSubCategoriesFail(errDetail))
          } else {
            resNotification("error", "Error", errDetail[0].msg)
            dispatch(getMultipleItemSubCategoriesFail(errDetail[0].msg))
          }
        }
      })
  }
}
