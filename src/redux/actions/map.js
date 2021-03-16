export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION ";
export const SET_PARTNER_LOCATION = "SET_PARTNER_LOCATION ";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
import api from "../../service/fca-api/fca-api";
import { ResponseStatus } from "../../constants/index";


export const setDestinationLocation = (location) => {
    console.log('Action - setDestinationLocation')
    console.log('des location ' + location.latitude + ', ' + location.longitude)
    return ({
        type: SET_DESTINATION_LOCATION,
        payload: location
    })
};

export const setPartnerLocation = (location) => {
    console.log('Action - setPartnerLocation')
    return ({
        type: SET_PARTNER_LOCATION,
        payload: location
    })
};

export const saveAddress = (customerId,param) => {
  try {
    
    console.log("customerID: "+ customerId);
    console.log('param', param);
    return async (dispatch) => {
      const response = await api.put(`/customer/${customerId}/address`, param);
   
      // if (response.data.meta.status !== ResponseStatus.SUCCESS) {
      //   throw new Error("Something went wrong");
      // }
      console.log("response: ", response);
      dispatch({
        type: SAVE_ADDRESS,
        payload: response.data.customer,
      });
    };
  } catch (error) {
    console.error("err save address: ", error);
  }
};

