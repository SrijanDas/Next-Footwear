import * as actionTypes from "../types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADDED_TO_CART:
      const { id } = payload;
      const itemIndex = state.items.indexOf((item) => item.id == id);

      if (itemIndex === -1)
        return {
          items: [...state.items, payload],
        };
      else {
        return {
          items: [...state.items, (state.items[itemIndex].quantity += 1)],
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
