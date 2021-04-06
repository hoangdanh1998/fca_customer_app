import moment from "moment";
import {
  DATE_TIME_FORMAT_CALL_API,
  LANGUAGE,
  TIME_FORMAT,
} from "../constants/index";
import { IMLocalized, init } from "../i18n/IMLocalized";

export const convertStringToCamel = (str) => {
  return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
};

init(LANGUAGE.VI);
export const convertTransaction = (transactions) => {
  const result = transactions.map((transaction) => {
    return {
      time: moment(transaction.createdAt).format(TIME_FORMAT),
      title: IMLocalized(transaction.toStatus.toLowerCase()),
      description: IMLocalized(
        `status-${transaction.toStatus.toLowerCase()}-message`
      ),
    };
  });
  return result;
};

export const convertEmergencyToNormal = (emergency) => {
  console.log("emergency", emergency);
  return {
    partner: emergency.partner,
    destination: emergency.destination,
    items: emergency.items.map((item) => {
      return {
        partnerItem: {
          id: item.partnerItem.id,
          name: item.partnerItem.name,
          price: item.partnerItem.price,
          status: item.partnerItem.status,
        },
        id: item.id,
        name: item.partnerItem.name,
        price: item.partnerItem.price,
        quantity: item.quantity,
      };
    }),
    order: {
      items: emergency.items.map((item) => {
        return {
          id: item.partnerItem.id,
          quantity: item.quantity,
          price: item.partnerItem.price,
          name: item.partnerItem.name,
          status: item.partnerItem.status,
          favoriteItemId: item.id,
        };
      }),
      total: emergency?.items?.reduce((sum, item) => {
        return (sum += item.quantity * item.partnerItem.price);
      }, 0),
      destination: emergency.destination,
      partner: emergency.partner,
    },
  };
};
