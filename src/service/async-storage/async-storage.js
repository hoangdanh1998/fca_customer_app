import AsyncStorage from "@react-native-async-storage/async-storage";


export const restoreOrderFromStorage = async () => {
    try {
        let order = await AsyncStorage.getItem("@storage_Order");
        if (order !== null) {
            return JSON.parse(order);
        }
    } catch (e) {
        throw error;
    }
    return null;
}

export const saveOrder = async (order) => {
    try {
        await AsyncStorage.setItem("@storage_Order", JSON.stringify(order));
    } catch (error) {
        throw error;
    }
}

export const removeOrder = async () => {
    try {
        await AsyncStorage.removeItem("@storage_Order");
    } catch (e) {
        throw new Error(error);
    }
}

