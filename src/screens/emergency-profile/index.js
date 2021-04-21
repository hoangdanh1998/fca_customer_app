import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Card,
  CardItem,
  Content,
  Left,
  List,
  Text,
  Body,
  H3,
  View,
  Footer,
  ListItem,
  Right,
  Icon,
  Radio,
  CheckBox,
} from "native-base";
import {
  ActivityIndicator,
  Switch,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import NumberFormat from "react-number-format";
import { withNavigation } from "@react-navigation/compat";
import { Divider } from "react-native-elements";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_PROFILE } from "../../constants/seeding";
import {
  LANGUAGE,
  DARK_COLOR,
  MESSAGES,
  PRIMARY_LIGHT_COLOR,
  LIGHT_COLOR,
  TIME_FORMAT,
  SCHEDULE_DAY_OPTION,
  DAY_IN_WEEK,
} from "../../constants/index.js";
import {
  switchSchedule,
  storeScheduleParam,
} from "../../redux/actions/emergency";
import { convertEmergencyToNormal } from "../../utils/utils";

const EmergencyProfile = (props) => {
  init(LANGUAGE.VI);
  // const profile = EMERGENCY_PROFILE;
  const loadedProfile = useSelector((state) => state.emergency.emergency);
  const loadedSchedule = useSelector((state) => state.emergency.schedule);

  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  const [paramScheduleTime, setParamScheduleTime] = useState(moment());
  const [paramScheduleDayList, setParamScheduleDayList] = useState(DAY_IN_WEEK);
  const [scheduleDayOption, setScheduleDayOption] = useState(
    SCHEDULE_DAY_OPTION[
      schedule
        ? schedule.day.length === 7
          ? 0
          : schedule.day.toString() === DAY_IN_WEEK.slice(0, 5).toString()
          ? 1
          : 2
        : 0
    ]
  );
  const [displayMode, setDisplayMode] = useState("order");
  const [profile, setProfile] = useState(loadedProfile);
  const [schedule, setSchedule] = useState(loadedSchedule);
  const [isSchedule, setIsSchedule] = useState(loadedSchedule?.isSchedule);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowScheduleAsMessage = () => {
    const dayMessage = schedule?.day?.map((d) => {
      return IMLocalized(`weekly-${d}`);
    });
    return `${IMLocalized("wording-message-automatic-schedule")}\n${moment(
      schedule?.time
    ).format(TIME_FORMAT)} ${dayMessage.toString()}`;
  };

  const handleSelectScheduleDayOption = (option) => {
    setScheduleDayOption(option);
    switch (option) {
      case SCHEDULE_DAY_OPTION[0]:
        setParamScheduleDayList(DAY_IN_WEEK);
        return;
      case SCHEDULE_DAY_OPTION[1]:
        setParamScheduleDayList(DAY_IN_WEEK.slice(0, 5));
        return;
      case SCHEDULE_DAY_OPTION[2]:
        setParamScheduleDayList([]);
        return;
      default:
        setParamScheduleDayList([]);
        return;
    }
  };

  const handleSelectDayInWeek = (day) => {
    const selectedDay = paramScheduleDayList.findIndex((d) => d === day);
    const newSelectionDayList = [...paramScheduleDayList];
    if (selectedDay < 0) {
      newSelectionDayList.push(day);
    } else {
      newSelectionDayList.splice(selectedDay, 1);
    }
    setParamScheduleDayList(newSelectionDayList);
    console.log(paramScheduleDayList.toString());
  };

  const handleSetupSchedule = async () => {
    const scheduleParam = {
      customerId: schedule.customerId,
      day: paramScheduleDayList,
      time: paramScheduleTime,
      isSchedule: isSchedule,
    };
    await dispatch(storeScheduleParam(scheduleParam));
    setScheduleDayOption(
      SCHEDULE_DAY_OPTION[
        schedule
          ? paramScheduleDayList.length === 7
            ? 0
            : paramScheduleDayList.length === 5 &&
              JSON.stringify(DAY_IN_WEEK.slice(0, 5)).trim() ===
                JSON.stringify(paramScheduleDayList).trim()
            ? 1
            : 2
          : 0
      ]
    );
  };

  useEffect(() => {
    if (loadedProfile && loadedProfile?.items) {
      const convertedProfile = convertEmergencyToNormal(loadedProfile);
      setProfile(convertedProfile);
    }
    setIsLoading(false);
  }, [loadedProfile]);

  useEffect(() => {
    if (loadedSchedule) {
      setSchedule(loadedSchedule);
      setIsSchedule(loadedSchedule?.isSchedule);

      setParamScheduleTime(moment(loadedSchedule.time));
      setParamScheduleDayList(loadedSchedule.day);

      setScheduleDayOption(
        SCHEDULE_DAY_OPTION[
          schedule
            ? schedule.day.length === 7
              ? 0
              : schedule.day.length === 5 &&
                JSON.stringify(DAY_IN_WEEK.slice(0, 5)) ===
                  JSON.stringify(schedule.day)
              ? 1
              : 2
            : 0
        ]
      );
    }
    setIsLoading(false);
  }, [loadedSchedule]);

  const renderTimerPicker = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setDisplayMode("order");
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Card
            style={{
              width: "90%",
              height: "85%",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <CardItem header bordered>
              <Text
                style={{
                  fontWeight: "bold",
                  color: DARK_COLOR,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {IMLocalized("wording-subtitle-automatic-schedule")}
              </Text>
            </CardItem>
            <CardItem bordered style={{ flexDirection: "column" }}>
              {visibleTimePicker ? (
                <DateTimePicker
                  value={
                    schedule
                      ? moment(paramScheduleTime).toDate()
                      : moment().toDate()
                  }
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, date) => {
                    setVisibleTimePicker(false);
                    setParamScheduleTime(moment(date));
                  }}
                />
              ) : null}
              <Text style={{ color: "black" }}>
                {IMLocalized("wording-message-automatic-schedule")}
              </Text>
              <TouchableWithoutFeedback
                style={{ backgroundColor: "red" }}
                onPress={() => {
                  setVisibleTimePicker(true);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    fontStyle: "normal",
                  }}
                >
                  {paramScheduleTime.format(TIME_FORMAT)}
                  <Icon
                    name="time-outline"
                    style={{ fontSize: 20, color: PRIMARY_LIGHT_COLOR }}
                  />
                </Text>
              </TouchableWithoutFeedback>
            </CardItem>
            <List
              style={{ height: "auto" }}
              dataArray={SCHEDULE_DAY_OPTION}
              renderRow={(item) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      handleSelectScheduleDayOption(item);
                    }}
                  >
                    <CardItem>
                      <Left style={{ flex: 1 }}>
                        <Radio
                          selected={item === scheduleDayOption}
                          color={PRIMARY_LIGHT_COLOR}
                          selectedColor={DARK_COLOR}
                        />
                      </Left>
                      <Right style={{ flex: 9 }}>
                        <Text style={{ width: "100%" }}>
                          {IMLocalized(`wording-option-${item}`)}
                        </Text>
                      </Right>
                    </CardItem>
                  </TouchableWithoutFeedback>
                );
              }}
            />
            {scheduleDayOption === "selection-day" ? (
              <List
                dataArray={DAY_IN_WEEK}
                renderRow={(item) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        handleSelectDayInWeek(item);
                      }}
                    >
                      <CardItem>
                        <Left style={{ flex: 1 }}>
                          <CheckBox
                            checked={paramScheduleDayList.includes(item)}
                            color={DARK_COLOR}
                            selectedColor={DARK_COLOR}
                          />
                        </Left>
                        <Right style={{ flex: 9 }}>
                          <Text style={{ width: "100%" }}>
                            {IMLocalized(`weekly-every-${item}`)}
                          </Text>
                        </Right>
                      </CardItem>
                    </TouchableWithoutFeedback>
                  );
                }}
              />
            ) : null}
            <CardItem>
              <Text note style={{ width: "100%", textAlign: "center" }}>
                {IMLocalized("wording-note-automatic-schedule")}
              </Text>
            </CardItem>
            <Footer style={styles.footer}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <UnFocusedButton
                  name="cancel"
                  onPress={() => {
                    setDisplayMode("order");
                  }}
                />
                <FocusedButton
                  name="save"
                  onPress={async () => {
                    if (
                      paramScheduleDayList &&
                      paramScheduleDayList.length <= 0
                    ) {
                      Alert.alert(
                        IMLocalized("wording-title-notification"),
                        IMLocalized("wording-message-no-schedule-day")
                      );
                    } else {
                      await handleSetupSchedule();
                      setDisplayMode("order");
                    }
                  }}
                />
              </View>
            </Footer>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderOrder = () => {
    return (
      <>
        <Content style={styles.content}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <H3 style={styles.title}>{profile?.partner?.name}</H3>
            <Text
              note
              style={{
                color: DARK_COLOR,
                width: "95%",
                marginLeft: "2.5%",
                textAlign: "center",
              }}
            >
              {profile?.partner?.address?.description}
            </Text>
            <List
              dataArray={profile?.items}
              renderRow={(item) => (
                <>
                  <OrderDetailCard item={item} />
                  <Divider style={{ backgroundColor: DARK_COLOR }} />
                </>
              )}
            />
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 3 }}>
                <H3 style={{ width: "100%", textAlign: "left" }}>
                  {IMLocalized("wording-total-price")}
                </H3>
              </Left>
              <Body style={{ flex: 4 }}>
                <H3 style={{ width: "100%", textAlign: "left" }}>
                  {profile?.items?.reduce((sum, item) => {
                    return (sum += item.quantity);
                  }, 0)}
                  {` ${IMLocalized("wording-item")}`}
                </H3>
              </Body>
              <Right style={{ flex: 3 }}>
                <NumberFormat
                  value={profile?.items?.reduce((sum, item) => {
                    return (sum += item.quantity * item.price);
                  }, 0)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <H3 style={{ width: "100%", textAlign: "right" }}>
                      {formattedValue} {IMLocalized("currency")}
                    </H3>
                  )}
                />
              </Right>
            </CardItem>
            <View
              style={{
                flex: 1,
                marginTop: "5%",
                width: "95%",
                marginLeft: "2.5%",
              }}
            >
              <Text note style={{ fontWeight: "bold" }}>
                {IMLocalized("wording-saved-address")}
              </Text>
              {profile?.destination?.label ? (
                <CardItem style={{ flex: 1 }}>
                  <Left style={{ flex: 1 }}>
                    <Text note style={{ fontWeight: "bold" }}>
                      {IMLocalized("wording-saved-address-label")}
                    </Text>
                  </Left>
                  <Body style={{ flex: 4 }}>
                    <Text note>{profile?.destination?.label}</Text>
                  </Body>
                </CardItem>
              ) : null}
              <CardItem style={{ flex: 1 }}>
                <Left style={{ flex: 1 }}>
                  <Text note style={{ fontWeight: "bold" }}>
                    {IMLocalized("wording-address")}
                  </Text>
                </Left>
                <Body style={{ flex: 4 }}>
                  <Text note>{profile?.destination?.description}</Text>
                </Body>
              </CardItem>
            </View>
            {schedule?.day ? (
              <View
                style={{
                  flex: 1,
                  marginTop: "5%",
                  width: "95%",
                  marginLeft: "2.5%",
                }}
              >
                <Text note style={{ fontWeight: "bold" }}>
                  {IMLocalized("wording-subtitle-automatic-schedule")}
                </Text>
                <CardItem>
                  <Left style={{ flex: 1 }}>
                    <Switch
                      trackColor={{
                        false: PRIMARY_LIGHT_COLOR,
                        true: DARK_COLOR,
                      }}
                      thumbColor={LIGHT_COLOR}
                      ios_backgroundColor={PRIMARY_LIGHT_COLOR}
                      onValueChange={() => {
                        handleSwitchSchedule();
                      }}
                      value={isSchedule}
                    />
                  </Left>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setDisplayMode("time");
                    }}
                  >
                    <Body style={{ flex: 4 }}>
                      <Text note>
                        {IMLocalized("wording-automatic-schedule")}
                      </Text>
                    </Body>
                  </TouchableWithoutFeedback>
                </CardItem>
                {isSchedule ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setDisplayMode("time");
                    }}
                  >
                    <CardItem>
                      <Left style={{ flex: 1 }}></Left>
                      <Body style={{ flex: 4 }}>
                        <Text note style={{ width: "100%" }}>
                          {handleShowScheduleAsMessage()}
                        </Text>
                      </Body>
                    </CardItem>
                  </TouchableWithoutFeedback>
                ) : null}
              </View>
            ) : null}
          </View>
        </Content>
        <Footer style={styles.footer}>
          <View style={{ flex: 1 }}>
            <FocusedButton
              block
              name={MESSAGES.ORDER}
              disable={false}
              onPress={() => {
                console.log("press");
                props.navigation.navigate("CREATE_EMERGENCY_ORDER", {
                  emergencyOrder: profile,
                });
              }}
            />
          </View>
        </Footer>
      </>
    );
  };

  const dispatch = useDispatch();
  const handleSwitchSchedule = async () => {
    const mode = !isSchedule;
    try {
      await dispatch(switchSchedule(mode));
      setIsSchedule(mode);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ================================= HANDLE UI =================================

  return !isLoading ? (
    profile && profile?.order ? (
      displayMode === "order" ? (
        renderOrder()
      ) : (
        renderTimerPicker()
      )
    ) : (
      <View></View>
    )
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
    </View>
  );
};

export default withNavigation(EmergencyProfile);
