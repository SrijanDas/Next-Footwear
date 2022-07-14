import * as actionTypes from "../types/cartTypes";

export const load_cart = () => async (dispatch) => {
  const cart = JSON.parse(localStorage.getItem("nf_cart")) || null;
  if (cart) {
    dispatch({
      type: actionTypes.CART_LOADED_SUCCESS,
      payload: cart,
    });
  } else {
    dispatch({
      type: actionTypes.CART_LOADED_FAIL,
    });
  }
};
