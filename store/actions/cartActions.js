import * as actionTypes from "../types";

export const addToCard =
  ({ productId, quantity }) =>
  async (dispatch) => {
    console.log(productId, quantity);
  };
