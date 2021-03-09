const { LOGIN, RESTORE_TOKEN, SIGN_OUT, FINISH_LOADING } = require("../actions/account");
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    customer: {},
    token: null,
    isLoading: true,
    isSignOut: false
};

const storeToken = async (token, customer) => {
    try {
        const jsonToken = JSON.stringify(token);
        const jsonCustomer = JSON.stringify(customer)
        await AsyncStorage.setItem('@storage_Token', jsonToken);
        await AsyncStorage.setItem('@storage_Customer', jsonCustomer);

    } catch (e) {
        // console.error("error of store token", e);
        throw new Error(e);
    }
};

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@storage_Token');
    } catch (e) {
        console.error("remove token error: ", e);
    }

    console.log('Done.')
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const data = action.payload.data;
            storeToken(data.token, data.customer);
            return { ...state, customer: data.customer, token: data.token, isSignOut: false };
        case RESTORE_TOKEN:
            // removeToken();
            return { ...state, token: action.payload.token, customer: action.payload.customer ,isLoading: false };
        case SIGN_OUT:
            removeToken();
            return { ...state, isSignOut: true };
        case FINISH_LOADING:
            console.log("change isloading");
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

export default accountReducer;