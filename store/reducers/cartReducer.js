import * as actionTypes from "../types";

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADDED_TO_CART:
      console.log(payload);
      const { id } = payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex === -1) {
        return {
          items: [...state.items, payload],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + payload.price,
        };
      } else {
        state.items[itemIndex].quantity += 1;
        state.items[itemIndex].price += payload.price;
        return {
          items: [...state.items],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + payload.price,
        };
      }
    case actionTypes.REMOVED_FROM_CART:
      return {
        items: [...state.items.filter((item) => item.id !== payload)],
      };
    default:
      return state;
  }
};

export default cartReducer;
