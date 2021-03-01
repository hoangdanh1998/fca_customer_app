export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION ";
export const SET_PARTNER_LOCATION = "SET_PARTNER_LOCATION ";

export const setDestinationLocation = (location) => {
    console.log('Action - setDestinationLocation')
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
} 

