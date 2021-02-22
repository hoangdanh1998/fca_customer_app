import { combineReducers } from "redux";
import storeReducer from "../actions/store";
import orderReducer from "./order";
import partnerReducer from "./partner";

export default rootReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,

  partner: partnerReducer,
});
