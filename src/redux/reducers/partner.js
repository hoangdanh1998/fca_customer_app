import { PARTNER_ACTIONS } from "../action-types/actions";
import { convertToCartItem } from "../../models/item";

const initialState = {
  partner: {},
};

const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_ACTIONS.GET_PARTNER_INFORMATION: {
      var data = action.payload.data.data.partner;
      var items = Array.from(data.items, (item) => {
        return convertToCartItem(item);
      });
      data.items = items;
      return { ...state, partner: data };
    }

    default:
      return state;
  }
};

export default partnerReducer;
