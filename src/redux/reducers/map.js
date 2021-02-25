const { SET_DETAILS_GEOMETRY, SET_PARTNER_LOCATION } = require("../actions/map");

const initialState = {
    detailsGeometry: null,
    partnerLocation: {}
}
const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAILS_GEOMETRY:
            return {...state, detailsGeometry: action.payload}; 
        case SET_PARTNER_LOCATION: {
            return {...state, partnerLocation: action.payload}
        }
        default:
            return state;
    }
    
;}

export default mapReducer;