import { ResponseStatus } from "../../constants/index";
import { ORDER_ACTIONS } from "../action-types/actions";
import api from "../../service/fca-api/fca-api";

export const createOrder = (param) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/order", param);
      if (response.data.meta.status !== ResponseStatus.SUCCESS) {
        throw new Error("Something went wrong");
      }
      dispatch({
        type: ORDER_ACTIONS.CREATE_ORDER,
        payload: response,
      });
    } catch (error) {
      console.log("error123", error);
      throw error;
    }
  };
};

export const getOrder = (param) => {
  return async (dispatch) => {
    console.log("request");
    try {
      const response = await api.get(`/order/${param}`);
      console.log("response", response);
      if (response.data.meta.status !== SUCCESS) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: ORDER_ACTIONS.GET_ORDER,
        payload: response,
      });
    } catch (error) {
      throw error;
    }
  };
};
