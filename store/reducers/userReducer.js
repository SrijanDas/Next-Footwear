import * as actionTypes from "../types";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case actionTypes.USER_LOADED_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
