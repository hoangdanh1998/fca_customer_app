import { SET_DESTINATION_LOCATION, SET_PARTNER_LOCATION } from "../actions/map";

const initialState = {
    destinationLocation: null,
    partnerLocation: null,
}
const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DESTINATION_LOCATION:
            return { ...state, destinationLocation: action.payload };
        case SET_PARTNER_LOCATION: {
            return { ...state, partnerLocation: action.payload }
        }
        default:
            return state;
    }
}

export default mapReducer; 
