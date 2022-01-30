import getApi from "../../helpers/getApi";
import Cookies from "js-cookie";
import * as types from "../actionType";
import { toast } from "react-toastify";

const areLoading = () => ({
  type: types.AUTH_LOADING,
});

const areError = () => ({
  type: types.AUTH_ERROR,
});

export const login = (creds, history) => {
  return (dispatch) => {
    dispatch(areLoading());
    getApi
      .post("/auth/login", creds)
      .then((response) => {
        toast("Welcome...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        Cookies.set("x-klikdokter-token", response.data?.token);
        dispatch({
          type: types.LOGIN,
          token: response.data?.token,
        });
        history.push("/");
      })
      .catch((error) => {
        dispatch(areError());
        let err = error.response.data.error
          ? error.response.data.error
          : error.response.data.email[0];
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const register = (user, history) => {
  return (dispatch) => {
    dispatch(areLoading());
    getApi
      .post("/register", user)
      .then(() => {
        toast("User is successfully registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({
          type: types.REGISTER,
        });
        history.push("/login");
      })
      .catch((error) => {
        dispatch(areError());
        let err = error.response.data.error
          ? error.response.data.error
          : error.response.data.email[0];
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(areLoading());
    toast("Goodbye...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    Cookies.remove("x-klikdokter-token");
    dispatch({
      type: types.CLEAR_PRODUCT,
    });
    dispatch({
      type: types.LOGOUT,
    });
  };
};
