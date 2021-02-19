const { ORDER_DETAILS, STORE, STORE_DETAILS } = require("../../constants/seeding");

const initialState = {
    store: STORE_DETAILS
};

const storeReducer = (state = initialState, action) => { 
    return state;
};

export default storeReducer;