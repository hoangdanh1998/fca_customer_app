import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertPartnerItemToEmergencyItem } from "../../utils/utils";
import { EMERGENCY_ACTION } from "../action-types/actions";

const initialState = {
  createdEmergency: null,
  history: [],
  emergency: {},
  suggestionEmergency: [],
  partner: {},
  destinationList: [],
  schedule: {},
};

const storeOrderParam = async (order) => {
  try {
    await AsyncStorage.setItem("@storage_OrderParam", JSON.stringify(order));
  } catch (e) {
    alert("store order failed");
  }
};

const storeScheduleParam = async (schedule) => {
  try {
    await AsyncStorage.setItem(
      "@storage_ScheduleParam",
      JSON.stringify(schedule)
    );
  } catch (e) {
    alert("store schedule failed");
  }
};

const getScheduleParam = async () => {
  try {
    const scheduleParamString = await AsyncStorage.getItem(
      "@storage_ScheduleParam"
    );
    return scheduleParamString ? JSON.parse(scheduleParamString) : {};
  } catch (e) {
    alert("Get schedule failed");
  }
};

const emergencyReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        emergency: action.payload,
        schedule: action.payload.schedule,
      };
    }

    case EMERGENCY_ACTION.CREATE_EMERGENCY: {
      return {
        ...state,
        emergency: action.payload,
      };
    }

    case EMERGENCY_ACTION.GET_DESTINATION: {
      return { ...state, destinationList: action.payload };
    }

    case EMERGENCY_ACTION.GET_PARTNER: {
      var data = action.payload.data.data.partner;
      var items = Array.from(data.items, (item) => {
        return convertPartnerItemToEmergencyItem(item);
      });
      data.items = items;
      return { ...state, partner: data };
    }

    case EMERGENCY_ACTION.STORE_ORDER: {
      storeOrderParam(action.payload);
      return;
    }

    case EMERGENCY_ACTION.STORE_SCHEDULE: {
      storeScheduleParam(action.payload);
      return { ...state, schedule: action.payload };
    }

    default:
      return state;
  }
};

export default emergencyReducer;
