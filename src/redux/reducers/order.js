import { ORDER_ACTIONS } from "../action-types/actions";

const initialState = {
  createdOrder: {},
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_ORDER: {
      const data = action.payload.data.data.order;
      return { ...state, createdOrder: data };
    }
    case ORDER_ACTIONS.GET_ORDER: {
      const data = action.payload.data.data.order;
      return { ...state, order: data };
    }
    default:
      return state;
  }
};

export default orderReducer;
