import * as actionTypes from "../types/cartTypes";

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let items = [...state.items];
  let totalAmount = state.totalAmount;
  let totalItems = state.totalItems;

  switch (type) {
    case actionTypes.CART_LOADED_SUCCESS:
      state = payload;
      return {
        ...state,
      };
    case actionTypes.CART_LOADED_FAIL:
      return {
        ...state,
      };
    case actionTypes.ADDED_TO_CART:
      const { id } = payload;
      const itemIndex = items.findIndex((item) => item.product === id);

      if (itemIndex === -1) {
        items.push({
          product: id,
          ...payload,
        });
      } else {
        items[itemIndex].quantity += 1;
      }
      totalItems += 1;
      totalAmount += payload.price;
      localStorage.setItem(
        "nf_cart",
        JSON.stringify({ items, totalAmount, totalItems })
      );
      return {
        items,
        totalItems,
        totalAmount,
      };
    case actionTypes.REMOVED_FROM_CART:
      const { id: idToRemove } = payload;
      const index = items.findIndex((item) => item.product === idToRemove);
      if (index === -1) {
        return { ...state };
      }
      totalItems -= 1;
      totalAmount -= payload.price;
      totalAmount = totalAmount > 0 ? totalAmount : 0;
      totalItems = totalAmount > 0 ? totalItems : 0;
      items.splice(index, 1);
      localStorage.setItem(
        "nf_cart",
        JSON.stringify({ items, totalAmount, totalItems })
      );
      return {
        items,
        totalAmount,
        totalItems,
      };

    case actionTypes.INCREMENT_QUANTITY:
      const { itemId } = payload;
      const itemIndex2 = items.findIndex((item) => item.product === itemId);
      items[itemIndex2].quantity += 1;
      totalItems += 1;
      totalAmount += payload.price;
      localStorage.setItem(
        "nf_cart",
        JSON.stringify({ items, totalAmount, totalItems })
      );
      return {
        items,
        totalItems,
        totalAmount,
      };
    case actionTypes.DECREMENT_QUANTITY:
      const { itemId2 } = payload;
      const itemIndex3 = items.findIndex((item) => item.product === itemId2);
      items[itemIndex3].quantity -= 1;
      totalItems -= 1;
      totalAmount -= payload.price;
      localStorage.setItem(
        "nf_cart",
        JSON.stringify({ items, totalAmount, totalItems })
      );
      return {
        items,
        totalItems,
        totalAmount,
      };
    case actionTypes.CLEAR_CART:
      localStorage.removeItem("nf_cart");
      return {
        items: [],
        totalAmount: 0,
        totalItems: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
