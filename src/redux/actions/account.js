export const LOGIN = "LOGIN";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const FINISH_LOADING = "FINISH_LOADING";
export const REGISTER_ACCOUNT = "REGISTER_ACCOUNT";
export const SET_DEVICE_KEY = "SET_DEVICE_KEY";
export const CHANGE_ERROR = "CHANGE_ERROR";
export const GET_FCA_ITEM = "GET_FCA_ITEM";


import fca from "../../service/fca-api/fca-api";
import { EMERGENCY_ACTION } from "../action-types/actions";

export const login = (phone, password) => {
    return async (dispatch) => {
        try {
            const response = await fca.post("/auth/login", {
                phone: phone,
                password: password,
            });
            dispatch({
                type: LOGIN,
                payload: response,
            });
            const responseEmergency = await fca.get(
                `/customer/${response.data.customer.id}/favorite`
            );
            dispatch({
                type: EMERGENCY_ACTION.GET_EMERGENCY,
                payload: responseEmergency.data.data.customer.favoriteSummary,
            });
        } catch (error) {
            throw new Error(error);
            // console.log("login", error);
        }
    };
};

export const finishLoading = () => {
    return {
        type: FINISH_LOADING,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const restoreToken = (token, customer) => {
    return {
        type: RESTORE_TOKEN,
        payload: {
            token,
            customer,
        },
    };
};

export const registerAccount = (account, name) => {
    return async dispatch => {
        try {
            const response = await fca.post('/customer',
                {
                    account: {
                        phone: account.numberPhone,
                        password: account.password
                    },
                    name,
                }
            )
        } catch (error) {
            console.error(error);
        }
    }
}
export const setDeviceKey = (deviceKey) => {
    return {
        type: SET_DEVICE_KEY,
        payload: deviceKey,
    };
};

export const changeError = (errMessage) => {
    console.log("error", errMessage);
    return {
        type: CHANGE_ERROR,
        payload: errMessage
    }
};

export const getFCAItem = () => {
    return async dispatch => {
        try {
            const response = await fca.get('/fca-item');
            // console.log("get getFCAItem: " , response);
            dispatch ({
                type: GET_FCA_ITEM,
                payload: response.data.data.fcaItems
            })
        } catch (error) {
            console.error(error);
        }
    }
}