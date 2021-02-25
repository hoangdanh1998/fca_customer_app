import moment from "moment";
import { IMLocalized, init } from "../i18n/IMLocalized";
import {
  LANGUAGE,
  DATE_TIME_FORMAT_CALL_API,
  TIME_FORMAT,
} from "../constants/index";

export const convertStringToCamel = (str) => {
  return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
};

init(LANGUAGE.VI);
export const convertTransaction = (transactions) => {
  console.log("input", transactions);
  const result = Array.from(
    transactions,
    (transaction = Object.assign({}, transaction)) => {
      return {
        time: moment(transaction.createdAt, DATE_TIME_FORMAT_CALL_API).format(
          TIME_FORMAT
        ),
        title: IMLocalized(transaction.toStatus.toLowerCase()),
        description: IMLocalized(
          `status-${transaction.toStatus.toLowerCase()}-message`
        ),
      };
    }
  );
  console.log("output", result);
  return result;
};
