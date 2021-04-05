
import { ResponseStatus } from '../../constants';
import fca from '../fca-api/fca-api';

export const updateExpoToken = async (token, id) => {
    try {
        const response = await fca.put(`/account/${id}/expo-token`,{exponentPushToken: token});
        if (response.data.meta.status !== ResponseStatus.SUCCESS) {
            throw new Error("Something went wrong!");
        }
        
    } catch (error) {
        throw error;
    }


}

export const checkPhoneExisted = async (phone) => {

    try {
        const response = await fca.get(`/account/?phone=${phone}`);
        if (response.data.meta.status !== ResponseStatus.SUCCESS) {
            throw new Error("Something went wrong!");
        }
    } catch (error) {
        throw error;
    }
}