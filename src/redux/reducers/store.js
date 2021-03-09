import { STORE_ACTIONS } from "../action-types/actions";
import { STORE_DETAILS } from "../../constants/seeding";

const initialState = {
  storeDetails: STORE_DETAILS,
  bestSuggestion: null,
  suggestionStores: null,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ACTIONS.SET_SUGGESTION_STORES: {
      return {
        ...state,
        bestSuggestion: action.payload.bestSuggestion,
        suggestionStores: action.payload.suggestionStores,
      };
    }
    default:
      return state;
  }
};

export default storeReducer;
