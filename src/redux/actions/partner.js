import { ResponseStatus } from "../../constants/index";
import { PARTNER_ACTIONS } from "../action-types/actions";
import api from "../../service/fca-api/fca-api";

export const getPartnerInformation = (param) => {
  return async (dispatch) => {
    const response = await api.get(`/partner/${param}`);
      if (response.data.meta.status !== ResponseStatus.SUCCESS) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: PARTNER_ACTIONS.GET_PARTNER_INFORMATION,
        payload: response,
      });
  };
};
export const setPartner = (partner) => {
  return (dispatch) => {
    dispatch({
      type: PARTNER_ACTIONS.SET_PARTNER,
      payload: { partner },
    })
  }
}