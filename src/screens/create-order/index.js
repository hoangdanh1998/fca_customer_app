import { withNavigation } from "@react-navigation/compat";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Content, Footer, View } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FocusedButton from "../../components/atoms/focused-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import NotificationModal from "../../components/atoms/notification-modal/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { OrderStatus, NOTICE_DURATION } from "../../constants/index";
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
  console.log("Before" + bestSuggestion.name, suggestionStores.length);
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );

  const submitOrder = useCallback(async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert(IMLocalized("wording-error-location"));
        return;
      }
      var location = await Location.getCurrentPositionAsync({});

      await dispatch(
        await createOrder({
          customerId: "76babaeb-3a80-4c35-8695-0305083e88fd",
          partnerId: store.id,
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
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
      console.log("SubmitOrderError", error);
      setVisibleTimer(false);
      setVisibleNotificationModal(true);
      setTimeout(() => {
        setVisibleNotificationModal(false);
      }, NOTICE_DURATION);
    }
  }, [dispatch]);

  const handlePressFocusedButton = async () => {
    setVisibleTimer(true);
    await submitOrder();
  };

  const cancelOrder = () => {
    setVisibleTimer(false);
    //Unclear biz
  };

  const handleRejectedOrder = () => {
    setVisibleTimer(false);
    setVisibleNotificationModal(true);
    setTimeout(() => {
      setVisibleNotificationModal(false);
    }, NOTICE_DURATION);
    const length = suggestionStores.length;
    if (length > 1) {
      const newSuggestion = suggestionStores[length - 2];
      const newSuggestList = suggestionStores.filter(
        (store) => store.id !== bestSuggestion.id
      );
      dispatch(setStoreSuggestion(newSuggestion, newSuggestList));
    }
    props.navigation.navigate("MAP_VIEW", { isAfterCreate: true });
  };

  const handleAcceptedOrder = () => {
    setVisibleTimer(false);
    props.navigation.navigate("ORDER_DETAIL", {
      isAfterCreate: true,
    });
  };

  const handleReceiveQRCode = (qrCode, orderId) => {
    console.log("handleReceiveQRCode", qrCode);
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
  };

  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    // notificationListener.current = Notifications.addNotificationReceivedListener(
    //   (notification) => {
    //     if (notification.request.content.title === "Confirm order") {
    //       console.log(notification.request.content.data.qrCode);
    //       linkToQRCodeScreen(notification.request.content.data.qrCode);
    //     }
    //   }
    // );

    // const linkToQRCodeScreen = (qrCode) => {
    //   props.navigation.navigate("QR_CODE", {
    //     qrCode,
    //   });
    // };

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(
    //   (response) => {
    //     console.log({ response });
    //   }
    // );

    if (createdOrder.id) {
      console.log("createdOrder", createdOrder.id);
      getOrderOnChange(createdOrder.id, (order) => {
        if (order.status === OrderStatus.ACCEPTANCE) {
          handleAcceptedOrder();
        }
        if (order.status === OrderStatus.REJECTION) {
          handleRejectedOrder();
        }
        if (order.qrcode && order.qrcode != "") {
          handleReceiveQRCode(order.qrCode, createdOrder.id);
        }
      });
    }

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener);
    //   Notifications.removeNotificationSubscription(responseListener);
    // };
  }, [dispatch, createdOrder]);

  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={store} orderDetails={order} />
        </View>
        {visibleTimer ? (
          <ProcessingModal visible={visibleTimer} onCancel={cancelOrder} />
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
        message={MESSAGES.REJECTED}
        visible={visibleNotificationModal}
      />
    </>
  );
};

export default withNavigation(CreateOrder);
