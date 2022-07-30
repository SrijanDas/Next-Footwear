import * as actionTypes from "../types/authTypes";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_END:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case actionTypes.USER_LOADED_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: payload,
      };

    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
