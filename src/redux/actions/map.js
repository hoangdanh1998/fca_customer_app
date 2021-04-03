export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION ";
export const SET_PARTNER_LOCATION = "SET_PARTNER_LOCATION ";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const DEL_ADDRESS = "DEL_ADDRESS";

import api from "../../service/fca-api/fca-api";

export const setDestinationLocation = (location) => {
    return ({
        type: SET_DESTINATION_LOCATION,
        payload: location
    })
};

export const setPartnerLocation = (location) => {
    return ({
        type: SET_PARTNER_LOCATION,
        payload: location
    })
};

export const saveAddress = (customerId,param) => {
  try {
    
    return async (dispatch) => {
      const response = await api.put(`/customer/${customerId}/address`, param);
   
      // if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      //   throw new Error("Something went wrong");
      // }
      dispatch({
        type: SAVE_ADDRESS,
        payload: response.data.data.customer,
      });
    };
  } catch (error) {
    // console.error("err save address: ", error);
  }
};

export const delAddress = (customerId,addressId) => {
  try {
    
    return async (dispatch) => {
      const response = await api.delete(`/customer/${customerId}/address/${addressId}`);
      console.log(response.d);
      // if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      //   throw new Error("Something went wrong");
      // }
      dispatch({
        type: DEL_ADDRESS,
        payload: response.data.data.customer,
      });
    };
  } catch (error) {
    // console.error("err save address: ", error);
  }
};

