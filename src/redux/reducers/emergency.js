import moment from "moment";
import { DATE_TIME_FORMAT_CALL_API } from "../../constants/index";
import { EMERGENCY_ACTION } from "../action-types/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  createdEmergency: null,
  prepareEmergencyOrder: {},
  history: [],
  emergency: {},
  suggestionEmergency: [],
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
      const suggestionEmergency = [];
      if (ordersHistory.length > 0) {
        ordersHistory.forEach((order) => {
          const elementEmergency = suggestionEmergency.find(
            (suggestion) => suggestion.partner.id === order.partner.id
          );
          if (elementEmergency) {
            elementEmergency.orders.push(order);
          } else {
            suggestionEmergency.push({
              partner: order.partner,
              orders: [order],
            });
          }
        });
        return {
          ...state,
          suggestionEmergency: suggestionEmergency.sort((a, b) => {
            return b.orders.length - a.orders.length;
          }),
        };
      } else return { ...state, suggestionEmergency: [] };
    }
    case EMERGENCY_ACTION.GET_EMERGENCY: {
      return { ...state, emergency: action.payload };
    }
    default:
      return state;
  }
};

export default emergencyReducer;
