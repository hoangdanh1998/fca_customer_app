const { STORE_DETAILS } = require("../../constants/seeding");


const initialState = {
    storeDetails: STORE_DETAILS
};

const storeReducer = (state = initialState, action) => {
    return state;
};

export default storeReducer;

