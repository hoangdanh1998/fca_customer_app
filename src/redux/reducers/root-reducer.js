import { combineReducers } from "redux";
import storeReducer from "./store";
import mapReducer from "./map";
import orderReducer from "./order";
import emergencyReducer from "./emergency";
import partnerReducer from "./partner";
import accountReducer from "./account";
import { SIGN_OUT } from "../actions/account";

const appReducer = combineReducers({
  store: storeReducer,
  order: orderReducer,
  map: mapReducer,
  partner: partnerReducer,
  account: accountReducer,
  emergency: emergencyReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state.store = undefined;
    state.partner = undefined;
    state.map = undefined;
    state.order = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
