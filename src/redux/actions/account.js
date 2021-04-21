export const LOGIN = "LOGIN";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const FINISH_LOADING = "FINISH_LOADING";
export const REGISTER_ACCOUNT = "REGISTER_ACCOUNT";
export const SET_DEVICE_KEY = "SET_DEVICE_KEY";
export const CHANGE_ERROR = "CHANGE_ERROR";
export const GET_FCA_ITEM = "GET_FCA_ITEM";
export const SAVE_FAVORITE_ITEM = "SAVE_FAVORITE_ITEM";
export const GET_FAVORITE_ITEM = "GET_FAVORITE_ITEM";

export const GET_CUSTOMER = "GET_CUSTOMER";

import fca from "../../service/fca-api/fca-api";
import { EMERGENCY_ACTION } from "../action-types/actions";

export const login = (phone, password) => {
  return async (dispatch) => {
    try {
      const response = await fca.post("/auth/login", {
        phone: phone,
        password: password,
      });
      dispatch({
        type: LOGIN,
        payload: response,
      });
      const responseEmergency = await fca.get(
        `/customer/${response.data.customer.id}/favorite`
      );
      dispatch({
        type: EMERGENCY_ACTION.GET_EMERGENCY,
        payload: responseEmergency.data.data.customer.favoriteSummary,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const finishLoading = () => {
  return {
    type: FINISH_LOADING,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const restoreToken = (token, customer) => {
  return {
    type: RESTORE_TOKEN,
    payload: {
      token,
      customer,
    },
  };
};

export const registerAccount = (account, name) => {
  return async (dispatch) => {
    try {
      const response = await fca.post("/customer", {
        account: {
          phone: account.numberPhone,
          password: account.password,
        },
        name,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const setDeviceKey = (deviceKey) => {
  return {
    type: SET_DEVICE_KEY,
    payload: deviceKey,
  };
};

export const changeError = (errMessage) => {
  return {
    type: CHANGE_ERROR,
    payload: errMessage,
  };
};
export const getCustomer = (id) => {
  return async (dispatch) => {
    try {
      const response = await fca.get(`/customer/${id}`);
      dispatch({
        type: GET_CUSTOMER,
        payload: response.data.data.customer,
      });
    } catch (error) {
      alert("Get customer failed");
    }
  };
};

export const getFCAItem = () => {
  return async (dispatch) => {
    try {
      const response = await fca.get("/fca-item");
      dispatch({
        type: GET_FCA_ITEM,
        payload: response.data.data.fcaItems,
      });
    } catch (error) {
      alert("Get FCA group failed");
    }
  };
};

export const saveFavoriteItem = (id, favoriteFcaItemIds) => {
  return async (dispatch) => {
    try {
      const response = await fca.put(`/customer/${id}/favorite-fca-items`, {
        favoriteFcaItemIds,
      });

      dispatch({
        type: SAVE_FAVORITE_ITEM,
        payload: response.data.data.customer,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const getFavoriteItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await fca.get(`/customer/${id}/favorite`);
      dispatch({
        type: GET_FAVORITE_ITEM,
        payload: response.data.data.customer.favoriteFcaItem,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
