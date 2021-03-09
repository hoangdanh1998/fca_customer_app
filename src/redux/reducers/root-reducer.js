import { combineReducers } from "redux";
import storeReducer from "./store";
import mapReducer from "./map";
import orderReducer from "./order";
import partnerReducer from "./partner";
import accountReducer from "./account";

const rootReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,
  map: mapReducer,
  partner: partnerReducer,
  account: accountReducer
});

export default rootReducer;