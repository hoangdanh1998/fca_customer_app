import { combineReducers } from "redux";
import storeReducer from "../actions/store";
import orderReducer from "./order";
import partnerReducer from "./partner";
import mapReducer from "./map";

export default rootReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,
  map: mapReducer,
  partner: partnerReducer,
});
