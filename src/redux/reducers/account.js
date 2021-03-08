const { LOGIN, RESTORE_TOKEN, SIGN_OUT, FINISH_LOADING } = require("../actions/account");
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    partner: {},
    token: null,
    isLoading: true,
    isSignOut: false
};

const storeToken = async (token) => {
    try {
        const jsonToken = JSON.stringify(token);
        await AsyncStorage.setItem('@storage_Token', jsonToken);
    } catch (e) {
        // console.error("error of store token", e);
        throw new Error(e);
    }
};

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@storage_Token')
    } catch (e) {
        console.error("remove token error: ", e);
    }

    console.log('Done.')
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const data = action.payload.data;
            storeToken(data.token);
            return { ...state, partner: data.partner, token: data.token, isSignOut: false };
        case RESTORE_TOKEN:
            return { ...state, token: action.payload, isLoading: false };
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