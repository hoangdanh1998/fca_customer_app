import { STORE_DETAILS } from "../../constants/seeding";
import { SUCCESS } from "../../constants/index";
import { PARTNER_ACTIONS } from "../action-types/actions";
import api from "../../service/fca-api/fca-api";

export const getPartnerInformation = (param) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/partner/${param}`);

      if (response.data.meta.status !== SUCCESS) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: PARTNER_ACTIONS.GET_PARTNER_INFORMATION,
        payload: response,
      });
    } catch (error) {
      throw error;
    }
  };
};
