
export const LOGIN = "LOGIN";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const FINISH_LOADING = "FINISH_LOADING";
export const REGISTER_ACCOUNT = "REGISTER_ACCOUNT";
export const SET_DEVICE_KEY = "SET_DEVICE_KEY";


import fca from "../../service/fca-api/fca-api";


export const login = (phone, password) => {
    return async dispatch => {
        try {
            const response = await fca.post('/auth/login', {phone: phone, password: password});
            dispatch({
                type:LOGIN,
                payload: response
            })
        } catch (error) {
            throw new Error(error);
            // console.error(error);
        }
    };
};

export const finishLoading = () => {
    return {
        type: FINISH_LOADING
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}

export const restoreToken = (token, customer) => {
    return {
        type: RESTORE_TOKEN,
        payload: {
            token,
            customer
        }
    }
}

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
            console.log("response registerAccount", response);
        } catch (error) {
            console.error(error);
        }
    }
}
export const setDeviceKey = (deviceKey) => {
    return {
        type: SET_DEVICE_KEY,
        payload: deviceKey
    }
}