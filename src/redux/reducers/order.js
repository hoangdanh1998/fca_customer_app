import moment from "moment";
import { DATE_TIME_FORMAT_CALL_API } from "../../constants/index";
import { ORDER_ACTIONS } from "../action-types/actions";

const initialState = {
  createdOrder: null,
  order: {},
  history: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_ORDER: {
      const data = action.payload;
      return { ...state, createdOrder: data };
    }
    case ORDER_ACTIONS.SET_CREATED_ORDER: {
      const data = action.payload;
      return { ...state, createdOrder: data };
    }
    case ORDER_ACTIONS.CANCEL_ORDER: {
      // const data = action.payload.data.data.order;
      return { ...state, createdOrder: null };
    }
    case ORDER_ACTIONS.RESET_ORDER: {
      // const data = action.payload.data.data.order;
      return { ...state, createdOrder: null };
    }
    case ORDER_ACTIONS.GET_ORDER: {
      const data = action.payload.data.data.order;
      return { ...state, order: data };
    }
    case ORDER_ACTIONS.GET_HISTORY: {
      const ordersHistory = action.payload;
      if (ordersHistory.length > 0) {
        ordersHistory.forEach((order) => {
          order.transaction = order.transaction.sort((a, b) => {
            return (
              moment(b.createdAt, DATE_TIME_FORMAT_CALL_API) -
              moment(a.createdAt, DATE_TIME_FORMAT_CALL_API)
            );
          });
        });
        return {
          ...state,
          history: ordersHistory.sort((a, b) => {
            return (
              moment(b.createdAt, DATE_TIME_FORMAT_CALL_API) -
              moment(a.createdAt, DATE_TIME_FORMAT_CALL_API)
            );
          }),
        };
      } else return { ...state, history: [] };
    }
    default:
      return state;
  }
};

export default orderReducer;
