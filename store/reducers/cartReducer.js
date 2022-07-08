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
      const itemIndex = items.findIndex((item) => item.id === id);

      if (itemIndex === -1) {
        items.push(payload);
      } else {
        items[itemIndex].quantity += 1;
        items[itemIndex].price += payload.price;
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
      return {
        items: [...state.items.filter((item) => item.id !== payload)],
      };
    default:
      return state;
  }
};

export default cartReducer;
