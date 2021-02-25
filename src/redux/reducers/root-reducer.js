import { combineReducers } from "redux";
import storeReducer from "../actions/store";
import mapReducer from "./map";
import orderReducer from "./order";
import partnerReducer from "./partner";

export default rootReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,
  map: mapReducer,
  partner: partnerReducer,
});
