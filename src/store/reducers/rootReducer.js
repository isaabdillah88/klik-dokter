import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  data: productReducer,
  auth: authReducer,
});

export default rootReducer;
