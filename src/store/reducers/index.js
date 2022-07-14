import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  cart: cartReducer,
});

export default rootReducer;
