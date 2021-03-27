import { ResponseStatus } from "../../constants/index";
import api from "../../service/fca-api/fca-api";
import { ORDER_ACTIONS } from "../action-types/actions";

export const createOrder = (param) => {
  return async (dispatch) => {
    const response = await api.post("/order", param);
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      throw new Error("Something went wrong");
    }
    const order = response.data.data.order;
    dispatch({
      type: ORDER_ACTIONS.CREATE_ORDER,
      payload: order,
    });
  };
};

export const cancelOrder = (param) => {
  return async (dispatch) => {
    const response = await api.put(`/order/${param.id}/status`, {
      status: param.status,
    });
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      throw new Error("Something went wrong");
    }
    dispatch({
      type: ORDER_ACTIONS.CANCEL_ORDER,
      payload: response,
    });
  };
};

export const getOrder = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/order/${param}`);
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: ORDER_ACTIONS.GET_ORDER,
      payload: response,
    });
  };
};

export const getHistory = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/order?customerPhone=${param}`);
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: ORDER_ACTIONS.GET_HISTORY,
      payload: response,
    });
  };
};

export const resetOrder = () => {
  return async (dispatch) => {
    dispatch({
      type: ORDER_ACTIONS.RESET_ORDER,
    });
  };
};

export const restoreOrderCreated = (order) => {
  return async (dispatch) => {
    dispatch({
      type: ORDER_ACTIONS.CREATE_ORDER,
      payload: order
    });
  };
};
