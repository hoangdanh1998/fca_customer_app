const {
  LOGIN,
  RESTORE_TOKEN,
  SIGN_OUT,
  FINISH_LOADING,
  SET_DEVICE_KEY,
  CHANGE_ERROR,
  GET_FCA_ITEM,
  GET_CUSTOMER,
  SAVE_FAVORITE_ITEM,
  GET_FAVORITE_ITEM,
} = require("../actions/account");
const { SAVE_ADDRESS } = require("../actions/map");
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  customer: {},
  token: null,
  isLoading: true,
  isSignOut: false,
  deviceKey: null,
  errMessage:null,
  fcaItems: null,
  favoriteFcaItems: null,
};

const storeToken = async (token, customer) => {
  try {
    const jsonToken = JSON.stringify(token);
    const jsonCustomer = JSON.stringify(customer);
    await AsyncStorage.setItem("@storage_Token", jsonToken);
    await AsyncStorage.setItem("@storage_Customer", jsonCustomer);
  } catch (e) {
    alert("Something went wrong");
  }
};

const storeCustomer = async (customer) => {
  try {
    await AsyncStorage.setItem("@storage_Customer", JSON.stringify(customer));
  } catch (error) {
    alert("Something went wrong");
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
    case CHANGE_ERROR:
      return { ...state, errMessage: action.payload };
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
    case GET_FCA_ITEM: {
      return { ...state, fcaItems: action.payload };
    }
    case GET_CUSTOMER: {
      storeCustomer(action.payload);
      return { ...state, customer: action.payload};
    } case SAVE_FAVORITE_ITEM: {
      return { ...state, favoriteFcaItems: action.payload.favoriteFcaItem, customer: action.payload}
    } case GET_FAVORITE_ITEM: {
      return { ...state, favoriteFcaItems: action.payload}
    }
    default:
      return state;
  }
};

export default accountReducer;
