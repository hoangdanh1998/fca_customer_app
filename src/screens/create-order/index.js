import { withNavigation } from "@react-navigation/compat";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Content, Footer, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FocusedButton from "../../components/atoms/focused-button/index";
import NotificationModal from "../../components/atoms/notification-modal/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import {
  LANGUAGE,
  MESSAGES,
  NOTICE_DURATION,
  OrderStatus
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { cancelOrder, createOrder, resetOrder } from "../../redux/actions/order";
import { setStoreSuggestion } from "../../redux/actions/store";
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";

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
  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );
  const [notificationMessage, setNotificationMessage] = useState("");


  

  const submitOrder = useCallback(async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert(IMLocalized("wording-error-location"));
        return;
      }
      var location = await Location.getCurrentPositionAsync({});

      dispatch(
        createOrder({
          customerId: customer.id,
          partnerId: store.id,
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
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
    } catch (error) {
      setVisibleTimer(false);
      setNotificationMessage(MESSAGES.REJECTED);
      setVisibleNotificationModal(true);
      setTimeout(() => {
        setVisibleNotificationModal(false);
      }, NOTICE_DURATION);
    }
  }, [dispatch]);

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
    setVisibleTimer(true);
    await submitOrder();
  };

  const handlePressCancelOrder = async () => {
    setVisibleTimer(false);
    if (createdOrder) {
      await destroyOrder(createdOrder.id);
      setNotificationMessage(MESSAGES.CANCELLED);
    }
    setVisibleNotificationModal(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        setVisibleNotificationModal(false);
        resolve();
      }, NOTICE_DURATION);
    });
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

    const length = suggestionStores.length;
    if (length > 1) {
      const newSuggestion = suggestionStores[length - 2];
      const newSuggestList = suggestionStores.filter(
        (store) => store.id !== bestSuggestion.id
      );
      dispatch(setStoreSuggestion(newSuggestion, newSuggestList));
    }
    props.navigation.navigate("MAP_VIEW");
  };

  const handleAcceptedOrder = () => {
    setVisibleTimer(false);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "ORDER_DETAIL",
            params: {

            },
          },
        ],
      })
    );
  };

  useEffect(() => {
    if (createdOrder) {
      getOrderOnChange(createdOrder.id, (order) => {
        if (order) {
          if (order.status === OrderStatus.ACCEPTANCE) {
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

  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={store} orderDetails={order} />
        </View>
        {visibleTimer ? (
          <ProcessingModal
            visible={visibleTimer}
            onCancel={handlePressCancelOrder}
          />
        ) : null}
      </Content>
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
      <NotificationModal
        message={notificationMessage}
        title={MESSAGES.TITLE_NOTIFICATION}
        visible={visibleNotificationModal}
      />
    </>
  );
};
export default withNavigation(CreateOrder);
