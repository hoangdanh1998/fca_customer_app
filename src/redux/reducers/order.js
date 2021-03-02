import moment from "moment";
import { DATE_TIME_FORMAT_CALL_API } from "../../constants/index";
import { ORDER_ACTIONS } from "../action-types/actions";

const initialState = {
  createdOrder: {},
  order: {},
  history: [],
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
    case ORDER_ACTIONS.GET_HISTORY: {
      const data = action.payload.data.data.orders;
      if (data.length > 0) {
        data.forEach((order) => {
          order.transaction = order.transaction.sort((a, b) => {
            return (
              moment(b.createdAt, DATE_TIME_FORMAT_CALL_API) -
              moment(a.createdAt, DATE_TIME_FORMAT_CALL_API)
            );
          });
        });
        return {
          ...state,
          history: data.sort((a, b) => {
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
