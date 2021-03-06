import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import moment from "moment";
import {
  Body,
  Card,
  CardItem,
  CheckBox,
  Content,
  Footer,
  H3,
  Icon,
  Left,
  List,
  ListItem,
  Radio,
  Right,
  Root,
  Text,
  Toast,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import EditQuantityModal from "../../components/atoms/edit-quantity-modal/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import NotificationModal from "../../components/atoms/notification-modal";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import {
  DARK_COLOR,
  DAY_IN_WEEK,
  LANGUAGE,
  MAX_ORDER_ITEM,
  MESSAGES,
  NOTICE_DURATION,
  PartnerItemStatus,
  PRIMARY_LIGHT_COLOR,
  SCHEDULE_DAY_OPTION,
  TIME_FORMAT,
} from "../../constants/index.js";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  createEmergency,
  getEmergency,
  getPartnerInformation,
  storeOrderParam,
  storeScheduleParam,
} from "../../redux/actions/emergency";
import { styles } from "./styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
init(LANGUAGE.VI);
const EditEmergencyOrder = (props) => {
  const selectedPartner = props.route.params.selectedPartner;
  const customer = useSelector((state) => state.account.customer);
  const loadedPartner = useSelector((state) => state.emergency.partner);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayId, setDisplayId] = useState("");
  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );
  const [messageNotificationModal, setMessageNotificationModal] = useState("");
  const [isSchedule, setIsSchedule] = useState(false);
  const [displayMode, setDisplayMode] = useState("order");
  const [visibleTimePicker, setVisibleTimePicker] = useState(true);
  const [partner, setPartner] = useState();
  const [selectedDestination, setSelectedDestination] = useState();
  const [scheduleTime, setScheduleTime] = useState(moment());
  const [scheduleDayList, setScheduleDayList] = useState(DAY_IN_WEEK);
  const [scheduleDayOption, setScheduleDayOption] = useState(
    SCHEDULE_DAY_OPTION[0]
  );

  const dispatch = useDispatch();
  const loadPartner = () => {
    try {
      dispatch(getPartnerInformation(selectedPartner.partner.id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCreateEmergency = async () => {
    const items = partner.items?.filter((item) => item.quantity > 0);
    const param = {
      customerId: customer.id,
      destinationId: selectedDestination.id,
      items: items.map((item) => {
        return {
          partnerItemId: item.id,
          quantity: item.quantity,
          favoriteItemId: item.favoriteItemId,
        };
      }),
    };
    console.log("param", param);

    try {
      await dispatch(createEmergency(param));
      if (isSchedule) {
        await handleSetupSchedule();
      }
      dispatch(getEmergency(customer.id));
      setVisibleNotificationModal(true);
      setMessageNotificationModal(MESSAGES.DONE);
      setTimeout(() => {
        setHasUnsavedChanges(false);
        setVisibleNotificationModal(false);
      }, NOTICE_DURATION);
    } catch (error) {
      console.log("error", error);
      setVisibleNotificationModal(true);
      setMessageNotificationModal(MESSAGES.FAIL);
      setTimeout(() => {
        setVisibleNotificationModal(false);
      }, NOTICE_DURATION);
    }
  };
  const handleSetupSchedule = async () => {
    const items = partner?.items?.filter((item) => item.quantity > 0);
    const orderParam = {
      customerId: customer.id,
      partnerId: partner.id,
      currentLocation: {
        latitude: "",
        longitude: "",
        destination: "",
      },
      destination: {
        latitude: selectedDestination.latitude,
        longitude: selectedDestination.longitude,
        description: selectedDestination.description,
      },
      items: items.map((item) => {
        return {
          partnerItemId: item.id,
          quantity: item.quantity,
        };
      }),
    };
    const scheduleParam = {
      customerId: customer.id,
      day: scheduleDayList,
      time: scheduleTime,
      isSchedule: isSchedule,
    };
    dispatch(storeScheduleParam(scheduleParam));
    dispatch(storeOrderParam(orderParam));
  };
  const handleNavigateAfterCreateSchedule = () => {
    props.navigation.dispatch(
      CommonActions.navigate({
        name: "",
      })
    );

    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "MAP_VIEW",
            params: {},
          },
          {
            name: "MY_PROFILE",
            params: {},
          },
          {
            name: "EMERGENCY_PROFILE",
            params: {},
          },
        ],
      })
    );
  };

  useEffect(() => {
    if (selectedPartner) {
      const destinations = selectedPartner.orders.reduce((desList, order) => {
        if (!desList[`${order.destination.description}`]) {
          desList[`${order.destination.description}`] = order.destination;
        }
        return desList;
      }, {});
      setDestinationList(Object.values(destinations));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadPartner();
  }, []);

  useEffect(() => {
    setPartner(loadedPartner);
    setSelectedDestination(
      destinationList?.length > 0 ? destinationList[0] : {}
    );
    setIsLoading(false);
  }, [loadedPartner, destinationList]);

  const updateItemQuantity = (itemParam, quantityParam) => {
    const totalItem = partner.items?.reduce((sum, i) => {
      return (sum += i.quantity);
    }, 0);
    if (totalItem >= MAX_ORDER_ITEM && quantityParam > 0) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      return;
    }
    if (totalItem <= 1 && quantityParam < 0) {
      Toast.show({
        text: IMLocalized("wording-too-less-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      loadPartner();
      return;
    }
    const item = itemParam;
    item.quantity += quantityParam;
    const index = partner.items.findIndex((i) => {
      return i.id === item.id;
    });
    const newPartner = partner;
    newPartner.items[index] = { ...item };
    setPartner({ ...newPartner });
  };

  const handleSelectScheduleDayOption = (option) => {
    setScheduleDayOption(option);
    switch (option) {
      case SCHEDULE_DAY_OPTION[0]:
        setScheduleDayList(DAY_IN_WEEK);
        return;
      case SCHEDULE_DAY_OPTION[1]:
        setScheduleDayList(DAY_IN_WEEK.slice(0, 5));
        return;
      case SCHEDULE_DAY_OPTION[2]:
        setScheduleDayList([]);
        return;
      default:
        setScheduleDayList([]);
        return;
    }
  };
  const handleSelectDayInWeek = (day) => {
    const selectedDay = scheduleDayList.findIndex((d) => d === day);
    const newSelectionDayList = [...scheduleDayList];
    if (selectedDay < 0) {
      newSelectionDayList.push(day);
    } else {
      newSelectionDayList.splice(selectedDay, 1);
    }
    setScheduleDayList(newSelectionDayList);
    console.log(scheduleDayList.toString());
  };
  const handleSelectSchedule = () => {
    const selection = !isSchedule;
    setIsSchedule(selection);
    if (selection) {
      setDisplayMode("time");
    } else {
      setDisplayMode("order");
    }
  };

  const renderOrderPicker = () => {
    return (
      <Root>
        <Content style={styles.content}>
          <View style={styles.view}>
            <H3 style={styles.partnerName}>{partner?.name}</H3>
            <Text note style={styles.partnerAddress}>
              {partner?.address?.description}
            </Text>
            <List
              dataArray={partner?.items?.filter(
                (item) => item.status === PartnerItemStatus.ACTIVE
              )}
              renderRow={(item) => (
                <>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setHasUnsavedChanges(true);
                      setDisplayId(displayId === item.id ? "" : item.id);
                    }}
                  >
                    <View>
                      <OrderDetailCard item={item} />
                    </View>
                  </TouchableWithoutFeedback>
                  <EditQuantityModal
                    item={item}
                    visible={item.id === displayId ? "flex" : "none"}
                    removeItem={() => updateItemQuantity(item, -1)}
                    addItem={() => updateItemQuantity(item, 1)}
                  />
                </>
              )}
            />
            <CardItem style={styles.totalItem}>
              <Left style={{ flex: 3 }}>
                <H3 style={styles.totalItemText}>
                  {IMLocalized("wording-total-price")}
                </H3>
              </Left>
              <Body style={{ flex: 4 }}>
                <H3 style={styles.totalItemText}>
                  {partner.items?.reduce((sum, item) => {
                    return (sum += item.quantity);
                  }, 0)}
                  {` ${IMLocalized("wording-item")}`}
                </H3>
              </Body>
              <Right style={{ flex: 3 }}>
                <NumberFormat
                  value={partner.items?.reduce((sum, item) => {
                    return (sum += item.quantity * item.price);
                  }, 0)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <H3 style={styles.totalItemNumber}>
                      {formattedValue} {IMLocalized("currency")}
                    </H3>
                  )}
                />
              </Right>
            </CardItem>

            <View style={styles.destinationView}>
              <Text note style={{ fontWeight: "bold" }}>
                {IMLocalized("wording-order-destination")}
              </Text>
              <List
                dataArray={destinationList}
                renderRow={(destination) => (
                  <ListItem>
                    <Radio
                      color={PRIMARY_LIGHT_COLOR}
                      selectedColor={DARK_COLOR}
                      selected={selectedDestination.id === destination.id}
                      onPress={() => {
                        setHasUnsavedChanges(true);
                        setSelectedDestination(destination);
                      }}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setHasUnsavedChanges(true);
                        setSelectedDestination(destination);
                      }}
                    >
                      <Body>
                        <Text>{destination.description}</Text>
                      </Body>
                    </TouchableWithoutFeedback>
                  </ListItem>
                )}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setHasUnsavedChanges(true);
                handleSelectSchedule();
              }}
            >
              <CardItem style={{ flex: 1 }}>
                <Left style={{ flex: 1 }}>
                  <CheckBox
                    color={DARK_COLOR}
                    checked={isSchedule}
                    onPress={() => {
                      setHasUnsavedChanges(true);
                      handleSelectSchedule();
                    }}
                  />
                </Left>
                <Body style={{ flex: 9 }}>
                  <Text style={{ width: "100%" }}>
                    {IMLocalized("wording-setup-schedule")}
                  </Text>
                </Body>
              </CardItem>
            </TouchableWithoutFeedback>
            {renderRemindSchedule()}
          </View>
        </Content>
        {partner.items?.reduce((sum, item) => {
          return (sum += item.quantity);
        }, 0) !== 0 ? (
          <Footer style={styles.footer}>
            {isSubmitting ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <FocusedButton
                  block
                  name={MESSAGES.SAVE}
                  disable={false}
                  onPress={async () => {
                    setIsSubmitting(true);
                    setHasUnsavedChanges(false);
                    await handleCreateEmergency();
                    setIsSubmitting(false);
                    handleNavigateAfterCreateSchedule();
                  }}
                />
              </View>
            )}
          </Footer>
        ) : null}
      </Root>
    );
  };
  const renderTimePicker = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setIsSchedule(false);
          setDisplayMode("order");
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Card
            style={{
              width: "90%",
              // marginLeft: "5%",
              height: "90%",
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
                  value={scheduleTime.toDate()}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, date) => {
                    setVisibleTimePicker(false);
                    setScheduleTime(moment(date));
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
                  {scheduleTime.format(TIME_FORMAT)}
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
                            checked={scheduleDayList.includes(item)}
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
                    setIsSchedule(false);
                  }}
                />
                <FocusedButton
                  name="save"
                  onPress={() => {
                    if (scheduleDayList && scheduleDayList.length <= 0) {
                      Alert.alert(
                        IMLocalized("wording-title-notification"),
                        IMLocalized("wording-message-no-schedule-day")
                      );
                    } else {
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
  const renderRemindSchedule = () => {
    if (!isSchedule) return;
    return (
      <CardItem style={{ flex: 1 }}>
        <Left style={{ flex: 8, flexDirection: "column" }}>
          <Text note style={{ width: "100%" }}>
            {IMLocalized("wording-message-automatic-schedule")}
          </Text>
          <Text note style={{ width: "100%", fontWeight: "bold" }}>
            {scheduleTime.format(TIME_FORMAT)}{" "}
            {scheduleDayOption === SCHEDULE_DAY_OPTION[2]
              ? scheduleDayList
                  .map((day) => {
                    return IMLocalized(`weekly-${day}`);
                  })
                  .toString()
              : IMLocalized(`wording-option-${scheduleDayOption}`)}
          </Text>
        </Left>
        <TouchableWithoutFeedback
          onPress={() => {
            setDisplayMode("time");
          }}
        >
          <Right style={{ flex: 2 }}>
            <Text
              style={{
                width: "100%",
                color: PRIMARY_LIGHT_COLOR,
                textAlign: "right",
              }}
            >
              {IMLocalized("wording-edit")}
            </Text>
          </Right>
        </TouchableWithoutFeedback>
      </CardItem>
    );
  };

  // ================================= HANDLE UI =================================

  return !isLoading ? (
    displayMode === "order" ? (
      renderOrderPicker()
    ) : (
      renderTimePicker()
    )
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
    </View>
  );
};

export default withNavigation(EditEmergencyOrder);
