import moment from "moment";
import { DATE_TIME_FORMAT_CALL_API } from "../../constants/index";
import { EMERGENCY_ACTION } from "../action-types/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  createdEmergency: null,
  prepareEmergencyOrder: {},
  history: [],
  emergency: {},
};

const storeEmergency = async (emergency) => {
  try {
    await AsyncStorage.setItem("@storage_Emergency", JSON.stringify(emergency));
  } catch (e) {
    console.log("store-emergency", e);
  }
};

const emergencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCY_ACTION.GET_ORDER: {
      const data = action.payload.data.data.order;
      return {
        ...state,
        prepareEmergencyOrder: data,
      };
    }
    case EMERGENCY_ACTION.GET_HISTORY: {
      const ordersHistory = action.payload;
      if (ordersHistory.length > 0) {
        ordersHistory.forEach((order) => {
          order.transaction = order.transaction.sort((a, b) => {
            return (
              moment(b.createdAt, DATE_TIME_FORMAT_CALL_API) -
              moment(a.createdAt, DATE_TIME_FORMAT_CALL_API)
            );
          });
        });
        return {
          ...state,
          history: ordersHistory.sort((a, b) => {
            return (
              moment(b.createdAt, DATE_TIME_FORMAT_CALL_API) -
              moment(a.createdAt, DATE_TIME_FORMAT_CALL_API)
            );
          }),
        };
      } else return { ...state, history: [] };
    }
    case EMERGENCY_ACTION.GET_EMERGENCY: {
      storeEmergency(action.payload);
      return { ...state, emergency: action.payload };
    }
    default:
      return state;
  }
};

export default emergencyReducer;
