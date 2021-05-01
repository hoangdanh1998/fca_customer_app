import { SET_DESTINATION_LOCATION, SET_GOOGLE_KEY, SET_PARTNER_LOCATION } from "../actions/map";

const initialState = {
    destinationLocation: null,
    partnerLocation: null,
    googleKey: '',
}
const mapReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case SET_DESTINATION_LOCATION:
            return { ...state, destinationLocation: action.payload };
        case SET_PARTNER_LOCATION: {
            return { ...state, partnerLocation: action.payload }
        } case SET_GOOGLE_KEY: {
            console.log("KEyy ", action.payload)
            return { ...state, googleKey: action.payload }
        }
        default:
            return state;
    }
}

export default mapReducer; 
