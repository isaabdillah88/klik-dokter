import Cookies from "js-cookie";
import * as types from "../actionType";

const initialState = {
  token: Cookies.get("x-klikdokter-token") || null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: Cookies.get("x-klikdokter-token") || null,
        loading: false,
      };
    case types.REGISTER:
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        loading: false,
      };
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export default authReducer;
