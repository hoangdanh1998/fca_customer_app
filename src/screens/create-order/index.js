/* eslint-disable react/prop-types */
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content, Footer, View } from "native-base";
import * as Notifications from "expo-notifications";
import { withNavigation } from "@react-navigation/compat";

import { createOrder } from "../../redux/actions/order";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { OrderStatus } from "../../constants/index";
import { setStoreSuggestion } from "../../redux/actions/store";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
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
  console.log("Before" + bestSuggestion.name, suggestionStores.length);
  const [visibleTimer, setVisibleTimer] = useState(false);

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
      // handleHideProcessingModal();
      setVisibleTimer(false);
      alert("Submit order fail");
    }
  }, [dispatch]);

  const handlePressOrderButton = async () => {
    setVisibleTimer(true);
    await submitOrder();
  };

  const cancelOrder = () => {
    setVisibleTimer(false);
    //Unclear biz
  };

  const handleRejectedOrder = () => {
    setVisibleTimer(false);
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

  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        if (notification.request.content.title === "Confirmation") {
          if (
            notification.request.content.data.status === OrderStatus.ACCEPTANCE
          ) {
            handleAcceptedOrder();
          } else {
            handleRejectedOrder();
          }
        }
        if (notification.request.content.title === "Confirm order") {
          console.log(notification.request.content.data.qrCode);
          linkToQRCodeScreen(notification.request.content.data.qrCode);
        }
      }
    );

    const linkToQRCodeScreen = (qrCode) => {
      props.navigation.navigate("QR_CODE", {
        qrCode,
      });
    };

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log({ response });
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
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
          <OrderButton
            block
            name={MESSAGES.ORDER}
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(CreateOrder);
