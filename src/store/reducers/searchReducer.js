import * as actionTypes from "../types/searchTypes";

const initialState = {
  isSearching: false,
  previousSearch: "",
  text: "",
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SEARCH_START:
      return {
        ...state,
        isSearching: true,
        text: payload,
      };
    case actionTypes.SEARCH_END:
      const temp = state.text;
      return {
        ...state,
        isSearching: false,
        // text: "",
        previousSearch: temp,
      };
    default:
      return state;
  }
};

export default searchReducer;
