import moment from "moment";
import { CUSTOMER_ADDRESS, ResponseStatus } from "../../constants/index";
import api from "../../service/fca-api/fca-api";
import { EMERGENCY_ACTION } from "../action-types/actions";

export const createEmergency = (param) => {
  return async (dispatch) => {
    try {
      const response = await api.put(
        `/customer/${param.customerId}/favorite`,
        param
      );
      dispatch({
        type: EMERGENCY_ACTION.GET_EMERGENCY,
        payload: response.data.data.customer.favoriteSummary,
      });
    } catch (err) {
      console.log(err);
      console.log("createEmergency-fail");
      alert("Something went wrong");
    }
  };
};

export const getEmergency = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/customer/${param}/favorite`);
    if (
      response.data.meta.status !== ResponseStatus.SUCCESS ||
      !response?.data?.data?.customer?.id
    ) {
      console.log("getEmergency-fail");
      alert("Something went wrong");
    }
    dispatch({
      type: EMERGENCY_ACTION.GET_EMERGENCY,
      payload: response.data.data.customer.favoriteSummary,
    });
  };
};

export const getOrder = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/order/${param}`);
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      // throw new Error("Something went wrong");
      console.log("getOrder-fail");
      alert("Something went wrong");
    }

    dispatch({
      type: EMERGENCY_ACTION.GET_ORDER,
      payload: response,
    });
  };
};

export const getHistory = (param) => {
  const from = moment(param.createdAt).format("YYYY-MM-DD");
  const now = moment(new Date()).add(1, "days").format("YYYY-MM-DD");

  return async (dispatch) => {
    const response = await api.get(
      `/order?customerPhone=${param.phone}&createdDate=${from}&toDate=${now}`
    );
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      // throw new Error("Something went wrong");
      console.log("getHistory-fail");
      alert("Something went wrong");
    }

    dispatch({
      type: EMERGENCY_ACTION.GET_HISTORY,
      payload: response.data.data.orders,
    });
  };
};

export const getPartnerInformation = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/partner/${param}`);
    if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: EMERGENCY_ACTION.GET_PARTNER,
      payload: response,
    });
  };
};

export const getDestination = (param) => {
  return async (dispatch) => {
    dispatch({
      type: EMERGENCY_ACTION.GET_DESTINATION,
      payload: CUSTOMER_ADDRESS,
    });
  };
};
