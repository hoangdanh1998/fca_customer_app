export const SET_DETAILS_GEOMETRY = "SET_DETAILS_GEOMETRY ";
export const SET_PARTNER_LOCATION = "SET_PARTNER_LOCATION ";

export const setDestination = (details) => {
    return ({
        type: SET_DETAILS_GEOMETRY,
        payload: details
    })
};

export const setPartnerLocation = (location) => {
    return ({
        type: SET_PARTNER_LOCATION,
        payload: location
    })
} 
