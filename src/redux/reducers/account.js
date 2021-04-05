const {
  LOGIN,
  RESTORE_TOKEN,
  SIGN_OUT,
  FINISH_LOADING,
  SET_DEVICE_KEY,
} = require("../actions/account");
const { SAVE_ADDRESS } = require("../actions/map");
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  customer: {},
  token: null,
  isLoading: true,
  isSignOut: false,
  deviceKey: null,
};

const storeToken = async (token, customer) => {
  try {
    const jsonToken = JSON.stringify(token);
    const jsonCustomer = JSON.stringify(customer);
    await AsyncStorage.setItem("@storage_Token", jsonToken);
    await AsyncStorage.setItem("@storage_Customer", jsonCustomer);
  } catch (e) {
    // console.error("error of store token", e);
    throw new Error(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@storage_Token");
    await AsyncStorage.removeItem("@storage_Customer");
    await AsyncStorage.removeItem("@storage_Emergency");
  } catch (e) {
    console.log("remove token error: ", e);
    // throw new Error(error);
  }
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const data = action.payload.data;
      storeToken(data.token, data.customer);
      return {
        ...state,
        customer: data.customer,
        token: data.token,
        isSignOut: false,
      };
    case RESTORE_TOKEN:
      // removeToken();
      return {
        ...state,
        token: action.payload.token,
        customer: action.payload.customer,
        isLoading: false,
      };
    case SIGN_OUT:
      removeToken();
      return { state: null, isSignOut: true };
    case FINISH_LOADING:
      return { ...state, isLoading: false };
    case SAVE_ADDRESS: {
      return { ...state, customer: action.payload };
    }
    case SET_DEVICE_KEY: {
      return { ...state, deviceKey: action.payload };
    }
    default:
      return state;
  }
};

export default accountReducer;
