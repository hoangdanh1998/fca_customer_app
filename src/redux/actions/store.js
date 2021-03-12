import { ResponseStatus } from "../../constants/index";
import api from "../../service/fca-api/fca-api";
import { getDirection } from '../../service/google-api/google-map-api';
import { STORE_ACTIONS } from "../action-types/actions";


export const getStoreSuggestion = (location, destination) => {
    console.log('dispatch setStoreSuggestion')
    return async (dispatch) => {
        try {
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
        } catch (error) {
            throw new Error(error);
        }


    };
}
export const setStoreSuggestion = (bestSuggestion, suggestionStores) => {
    return async (dispatch) => {
        dispatch({
            type: STORE_ACTIONS.SET_SUGGESTION_STORES,
            payload: {
                suggestionStores: suggestionStores,
                bestSuggestion: bestSuggestion,
            },
        });
    }
}