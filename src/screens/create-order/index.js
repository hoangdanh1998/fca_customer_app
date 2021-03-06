import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import moment from "moment";
import { Card, CardItem, Content, Footer, View } from "native-base";
import { default as React, useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch, useSelector } from "react-redux";
import FocusedButton from "../../components/atoms/focused-button/index";
import NotificationModal from "../../components/atoms/notification-modal/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import {
  DARK_COLOR,
  FCATime,
  LANGUAGE,
  LIGHT_COLOR,
  MESSAGES,
  NOTICE_DURATION,
  OrderStatus,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  cancelOrder,
  createOrder,
  resetOrder,
} from "../../redux/actions/order";
import { getCustomer } from "../../redux/actions/account";
import { setStoreSuggestion } from "../../redux/actions/store";
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";
import { getDistance } from "../../service/google-api/google-map-api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const CreateOrder = (props) => {
  init(LANGUAGE.VI);
  const dispatch = useDispatch();

  const store = props.route.params.store;

  const order = props.route.params.cart;

  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);
  const createdOrder = useSelector((state) => state.order.createdOrder);
  const customer = useSelector((state) => state.account.customer);
  const destination = useSelector((state) => state.map.destinationLocation);

  const [visibleTimer, setVisibleTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [visibleConfirmDistance, setVisibleConfirmDistance] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [estimateTime, setEstimateTime] = useState();
  const [isWaiting, setIsWaiting] = useState(false);
  const [timeOutState, setTimeOutState] = useState(null);

  const reSuggest = () => {
    if (suggestionStores && bestSuggestion) {
      const length = suggestionStores.length;
      if (length > 1) {
        const newSuggestion = suggestionStores[length - 2];
        const newSuggestList = suggestionStores.filter(
          (store) => store.id !== bestSuggestion.id
        );
        dispatch(setStoreSuggestion(newSuggestion, newSuggestList));
      }
    }
  };

  const confirmDistance = async () => {
    // const { status } = await Permissions.getAsync(Permissions.LOCATION);
    // if (status !== "granted") {
    //   alert(IMLocalized("wording-error-location"));
    //   return;
    // }
    setIsLoading(true);
    var location = await Location.getCurrentPositionAsync({});
    const distance = await getDistance(location.coords, store.address);
    setIsLoading(false);
    if (distance.distance.value < 2000) {
      setVisibleConfirmDistance(true);
    } else {
      await submitOrder();
    }
  };

  const submitOrder = async () => {
    try {
      setIsLoading(true);
      var location = await Location.getCurrentPositionAsync({});
      await dispatch(
        createOrder({
          customerId: customer.id,
          partnerId: store.id,
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          estimateTime,
          destination: {
            latitude: destination.latitude,
            longitude: destination.longitude,
            description: destination.description,
          },
          items: Array.from(order.items, (item) => {
            return {
              partnerItemId: item.id,
              quantity: item.quantity,
            };
          }),
        })
      );
      console.log("Before");
      setVisibleTimer(true);
      setIsLoading(false);
    } catch (error) {
      setVisibleTimer(false);
      if ((error + "").indexOf("412") !== -1) {
        setNotificationMessage(MESSAGES.INCOMPLETE);
      } else {
        setNotificationMessage(MESSAGES.REJECTED);
      }
      setIsLoading(false);
      setVisibleNotificationModal(true);
      setTimeOutState(
        setTimeout(() => {
          setVisibleNotificationModal(false);
        }, NOTICE_DURATION)
      );
    }
  };

  const destroyOrder = async (orderId) => {
    try {
      dispatch(
        cancelOrder({
          id: orderId,
          status: OrderStatus.CANCELLATION,
        })
      );
    } catch (error) {
      setVisibleTimer(false);
      alert("Can not cancel order");
    }
  };

  const handlePressFocusedButton = async () => {
    const balance = parseInt(customer.account.balance);
    const orderTotal = parseInt(order.total);
    if (orderTotal > balance) {
      Alert.alert(
        IMLocalized("wording-title-notification"),
        IMLocalized("wording-message-not-enough-balance"),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
    await confirmDistance();
  };

  const handlePressCancelOrder = async () => {
    setVisibleTimer(false);
    if (createdOrder) {
      await destroyOrder(createdOrder.id);
    }
    dispatch(resetOrder());
  };

  const handleRejectedOrder = async () => {
    setVisibleTimer(false);
    setNotificationMessage(MESSAGES.REJECTED);
    setVisibleNotificationModal(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        setVisibleNotificationModal(false);
        resolve();
      }, NOTICE_DURATION);
    });
    reSuggest();
    props.navigation.navigate("MAP_VIEW");
  };

  const handleAcceptedOrder = () => {
    dispatch(getCustomer(customer.id));
    setVisibleTimer(false);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "ORDER_DETAIL",
            params: {},
          },
        ],
      })
    );
  };

  useEffect(() => {
    if (createdOrder) {
      getOrderOnChange(createdOrder.id, (order) => {
        if (order) {
          if (!order.timeRemain && order.status === OrderStatus.ACCEPTANCE) {
            handleAcceptedOrder();
          }

          if (order.status === OrderStatus.REJECTION) {
            handleRejectedOrder();
            dispatch(resetOrder());
          }
        }
      });
    }
  }, [createdOrder]);

  useEffect(() => {
    (async () => {
      var location = await Location.getCurrentPositionAsync({});
      const distance = await getDistance(location.coords, store.address);
      setCurrentLocation(location);
      setEstimateTime(distance.duration.value);
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && store.busyTime && estimateTime) {
      for (const busyTime of store.busyTime) {
        const start = moment(new Date(+busyTime.split(" - ")[0]));
        const end = moment(new Date(+busyTime.split(" - ")[1]));
        const estimate = moment().add(
          estimateTime - FCATime.PrepareTime * 60,
          "second"
        );
        if (estimate.isBetween(start, end, true)) {
          setIsWaiting(true);
        }
      }
    }
  }, [currentLocation, estimateTime]);

  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          {isWaiting ? (
            <Card>
              <CardItem style={{ backgroundColor: LIGHT_COLOR }}>
                <Text>{IMLocalized("wording-message-partner-busy")}</Text>
              </CardItem>
            </Card>
          ) : (
            <></>
          )}
          <OrderDetail store={store} orderDetails={order} />
        </View>
        {visibleTimer ? (
          <ProcessingModal
            visible={visibleTimer}
            onCancel={handlePressCancelOrder}
          />
        ) : null}
      </Content>
      {!isLoading ? (
        <Footer style={{ backgroundColor: "white" }}>
          <View style={{ flex: 1 }}>
            <FocusedButton
              block
              name={MESSAGES.ORDER}
              disable={false}
              onPress={() => {
                handlePressFocusedButton();
              }}
            />
          </View>
        </Footer>
      ) : (
        <Footer style={{ backgroundColor: "white" }}>
          <ActivityIndicator size="large" color={DARK_COLOR} />
        </Footer>
      )}
      <NotificationModal
        message={notificationMessage}
        title={MESSAGES.TITLE_NOTIFICATION}
        visible={visibleNotificationModal}
      />
      <AwesomeAlert
        show={visibleConfirmDistance}
        showProgress={false}
        title={IMLocalized(`wording-title-confirmation`)}
        message={IMLocalized("wording-not-enough-distance")}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        contentStyle={{ backgroundColor: LIGHT_COLOR }}
        contentContainerStyle={{ backgroundColor: LIGHT_COLOR }}
        cancelText={IMLocalized("wording-cancel")}
        confirmText={IMLocalized("wording-ok")}
        confirmButtonColor={DARK_COLOR}
        showCancelButton={true}
        showConfirmButton={true}
        onDismiss={() => {
          setVisibleConfirmDistance(false);
          clearTimeout(timeOutState);
        }}
        onCancelPressed={() => {
          setVisibleConfirmDistance(false);
        }}
        onConfirmPressed={async () => {
          setVisibleConfirmDistance(false);
          await submitOrder();
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
  },
});
export default withNavigation(CreateOrder);
