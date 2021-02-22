import { ORDER_ACTIONS } from "../action-types/actions";

const initialState = {
  createdOrder: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_ORDER: {
      const data = action.payload.data.data;
      return { ...state, createdOrder: data };
    }

    default:
      return state;
  }
};

export default orderReducer;
