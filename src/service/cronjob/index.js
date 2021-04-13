import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { convertDayOfWeek } from "../../utils/utils";
import { LANGUAGE } from "../../constants/index";

init(LANGUAGE.VI);
const BACKGROUND_MAKE_ORDER_TASK = "BACKGROUND_MAKE_ORDER_TASK";
TaskManager.defineTask(BACKGROUND_MAKE_ORDER_TASK, async () => {
  console.log(BACKGROUND_MAKE_ORDER_TASK, moment().toString());

  // Get current location
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  if (status !== "granted") {
    alert(IMLocalized("wording-error-location"));
    return;
  }

  // Check whether need to create order
  const storageScheduleString = await AsyncStorage.getItem(
    "@storage_ScheduleParam"
  );
  const storageSchedule = JSON.parse(storageScheduleString);

  const todayDOW = convertDayOfWeek(moment().day());
  const minRange = moment().subtract(15, "minutes");
  const maxRange = moment().add(15, "minutes");
  const timeNeedToMakeOrder = moment(storageSchedule.time);
  const lastestOrderDay = await AsyncStorage.getItem(
    "@storage_LastestOrderDay"
  );
  const isNeedMakeOrder = lastestOrderDay
    ? !moment(lastestOrderDay).isBetween(
        moment().startOf("day"),
        moment().endOf("day")
      )
    : false;
  // 1. Check day + time + isNeedMakeOrder
  console.log("Check day", storageSchedule.day.includes(todayDOW));
  console.log(
    "Check time",
    timeNeedToMakeOrder.isBetween(minRange, maxRange, "[]")
  );
  console.log("isNeedMakeOrder", isNeedMakeOrder);
  if (
    storageSchedule.day.includes(todayDOW) &&
    timeNeedToMakeOrder.isBetween(minRange, maxRange, "[]") &&
    isNeedMakeOrder
  ) {
    const storageOrder = JSON.parse(storageOrderString);
    const location = await Location.getCurrentPositionAsync({});
    storageOrder.currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    console.log("storageOrder", storageOrder);
  }
});
export const addSchedule = async (scheduleString, action) => {
  console.log("addSchedule");
  BackgroundFetch.registerTaskAsync(BACKGROUND_MAKE_ORDER_TASK, {
    minimumInterval: 1 * 60,
  });
  const result = await TaskManager.getRegisteredTasksAsync();
  console.log("result", result);
};
export const removeSchedule = async () => {
  BackgroundFetch.unregisterTaskAsync(BACKGROUND_MAKE_ORDER_TASK)
    .then(() => {
      console.log("Unregister success");
    })
    .catch((err) => console.log("unregister fail", err));
};
