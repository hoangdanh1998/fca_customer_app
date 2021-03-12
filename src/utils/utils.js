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
