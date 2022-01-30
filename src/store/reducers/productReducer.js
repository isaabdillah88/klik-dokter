import * as types from "../actionType";

const initialState = {
  loading: true,
  product: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case types.ADD_PRODUCT:
    case types.EDIT_PRODUCT:
    case types.DELETE_PRODUCT:
    case types.CLEAR_PRODUCT:
      return {
        ...state,
        product: [],
        loading: false,
      };
    case types.PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.PRODUCT_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return  {
        ...state,
        loading: false
      }
  }
};

export default productReducer;
