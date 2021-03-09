
export const LOGIN = "LOGIN";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const FINISH_LOADING = "FINISH_LOADING";


import fca from "../../service/fca-api/fca-api";


export const login = (phone, password) => {
    return async dispatch => {
        try {
            const response = await fca.post('/auth/login', {phone: "0392211345", password: "gu123451"});
            console.log("account partner", response);
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