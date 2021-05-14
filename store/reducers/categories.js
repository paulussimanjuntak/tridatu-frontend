import * as actionType from "store/actions/actionTypes";
import { updateObject } from "lib/utility";

const initialState = {
  categories: [],
  subcategories: [],
  itemsubcategories: [],
  multipleCategoriesData: [],
  multipleSubCategoriesData: [],
  multipleItemSubCategoriesData: [],
  allCategories: [],
  loading: false,
  error: null,
};

/* CATEGORIES */
const getCategoriesStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.categories,
    loading: false,
  });
};

const getCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

/* SUB CATEGORIES */
const getSubCategoriesStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getSubCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    subcategories: action.subcategories,
    loading: false,
  });
};

const getSubCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

/* ITEM SUB CATEGORIES */
const getItemSubCategoriesStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getItemSubCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    itemsubcategories: action.itemsubcategories,
    loading: false,
  });
};

const getItemSubCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

/* ALL CATEGORIES */
const getAllCategoriesStart = (state, _) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getAllCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    allCategories: action.allCategories,
    loading: false,
  });
};

const getAllCategoriesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};


const getMultipleCategoriesStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const getMultipleCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    multipleCategoriesData: action.payload
  })
}

const getMultipleCategoriesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}


const getMultipleSubCategoriesStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const getMultipleSubCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    multipleSubCategoriesData: action.payload
  })
}

const getMultipleSubCategoriesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}


const getMultipleItemSubCategoriesStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const getMultipleItemSubCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    multipleItemSubCategoriesData: action.payload
  })
}

const getMultipleItemSubCategoriesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    /* CATEGORIES */
    case actionType.GET_CATEGORIES_START:
      return getCategoriesStart(state, action)
    case actionType.GET_CATEGORIES_SUCCESS:
      return getCategoriesSuccess(state, action)
    case actionType.GET_CATEGORIES_FAIL:
      return getCategoriesFail(state, action)

    /* SUB CATEGORIES */
    case actionType.GET_SUBCATEGORIES_START:
      return getSubCategoriesStart(state, action)
    case actionType.GET_SUBCATEGORIES_SUCCESS:
      return getSubCategoriesSuccess(state, action)
    case actionType.GET_SUBCATEGORIES_FAIL:
      return getSubCategoriesFail(state, action)

    /* SUB CATEGORIES */
    case actionType.GET_ITEMSUBCATEGORIES_START:
      return getItemSubCategoriesStart(state, action)
    case actionType.GET_ITEMSUBCATEGORIES_SUCCESS:
      return getItemSubCategoriesSuccess(state, action)
    case actionType.GET_ITEMSUBCATEGORIES_FAIL:
      return getItemSubCategoriesFail(state, action)

    /* ALL CATEGORIES */
    case actionType.GET_ALLCATEGORIES_START:
      return getAllCategoriesStart(state, action)
    case actionType.GET_ALLCATEGORIES_SUCCESS:
      return getAllCategoriesSuccess(state, action)
    case actionType.GET_ALLCATEGORIES_FAIL:
      return getAllCategoriesFail(state, action)


    /* MULTIPLE DATA */
    case actionType.GET_MULTIPLE_CATEGORIES_START:
      return getMultipleCategoriesStart(state, action)
    case actionType.GET_MULTIPLE_CATEGORIES_SUCCESS:
      return getMultipleCategoriesSuccess(state, action)
    case actionType.GET_MULTIPLE_CATEGORIES_FAIL:
      return getMultipleCategoriesFail(state, action)

    case actionType.GET_MULTIPLE_SUBCATEGORIES_START:
      return getMultipleSubCategoriesStart(state, action)
    case actionType.GET_MULTIPLE_SUBCATEGORIES_SUCCESS:
      return getMultipleSubCategoriesSuccess(state, action)
    case actionType.GET_MULTIPLE_SUBCATEGORIES_FAIL:
      return getMultipleSubCategoriesFail(state, action)

    case actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_START:
      return getMultipleItemSubCategoriesStart(state, action)
    case actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_SUCCESS:
      return getMultipleItemSubCategoriesSuccess(state, action)
    case actionType.GET_MULTIPLE_ITEMSUBCATEGORIES_FAIL:
      return getMultipleItemSubCategoriesFail(state, action)

    default:
      return state
  }
}

export default reducer
