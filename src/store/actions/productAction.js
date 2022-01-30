import getApi from "../../helpers/getApi";
import * as types from "../actionType";
import { toast } from "react-toastify";

const isLoading = () => ({
  type: types.PRODUCT_LOADING,
});

const isError = () => ({
  type: types.PRODUCT_ERROR,
});

export const getProduct = (sku) => {
  return (dispatch) => {
    dispatch(isLoading());
    getApi
      .post("/item/search", sku)
      .then((response) => {
        dispatch({
          type: types.SEARCH_PRODUCT,
          payload: response.data.id ? [response.data] : [],
        });
        if (!response.data.id) {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        dispatch(isError());
        toast.error(error.response.data.sku[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const addProduct = (item, history) => {
  return (dispatch) => {
    dispatch(isLoading());
    getApi
      .post("/item/add", item)
      .then((response) => {
        if (response.data.id) {
          toast.success("Product successfully added", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch({
            type: types.ADD_PRODUCT,
          });
          history.push("/");
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(isError());
        }
      })
      .catch((error) => {
        dispatch(isError());
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const editProduct = (product, history) => {
  return (dispatch) => {
    dispatch(isLoading());
    getApi
      .post("/item/update", product)
      .then(() => {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({
          type: types.EDIT_PRODUCT,
        });
        history.push("/");
      })
      .catch((error) => {
        dispatch(isError());
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch(isLoading());
    getApi
      .post("/item/delete", id)
      .then(() => {
        toast.success("Product successfully deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({
          type: types.DELETE_PRODUCT,
        });
      })
      .catch((error) => {
        dispatch(isError());
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
};
