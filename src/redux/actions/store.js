import { STORE_ACTIONS } from "../action-types/actions";
import { ResponseStatus } from "../../constants/index";
export const SET_PARTNER_LOCATION = "SET_PARTNER_LOCATION ";
import api from "../../service/fca-api/fca-api";
import { getDirection } from '../../service/google-api/google-map-api'

export const setStoreSuggestion = (location, destination) => {
    console.log('dispatch setStoreSuggestion')
    console.log({ 'dispatch location': location })
    return async (dispatch) => {
        console.log('dispatch')
        const direction = await getDirection(location, destination);
        const directionSteps = direction.routes[0].legs[0].steps;

        const response = await api.post(`/partner/suggestion`,
            JSON.stringify(directionSteps), {
            headers: { 'Content-Type': 'text/plain' }
        }
        );
        if (response.data.meta.status !== ResponseStatus.SUCCESS) {
            throw new Error("Something went wrong");
        }
        dispatch({
            type: STORE_ACTIONS.SET_SUGGESTION_STORES,
            payload: {
                suggestionStores: response.data.data.partners,
                bestSuggestion: response.data.data.suggestion,
            },
        });
    };
}