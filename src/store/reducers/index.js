import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  cart: cartReducer,
  search: searchReducer,
});

export default rootReducer;
