import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
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
  OrderStatus,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { ORDER_ACTIONS } from "../../redux/action-types/actions";
import { cancelOrder, createOrder } from "../../redux/actions/order";
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
  console.log("customer id from store:", customer.id);

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

      dispatch(
        createOrder({
          customerId: customer.id,
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

  const destroyOrder = async (orderId) => {
    try {
      dispatch(
        cancelOrder({
          id: orderId,
          status: OrderStatus.CANCELLATION,
        })
      );
    } catch (error) {
      console.log("CancelOrderError", error);
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
    await destroyOrder(createdOrder.id);
    alert("Cancel order success");
  };

  const handleRejectedOrder = async () => {
    setVisibleTimer(false);
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
    props.navigation.navigate("MAP_VIEW", { isAfterCreate: true });
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
              isAfterCreate: true,
            },
          },
        ],
      })
    );
    // props.navigation.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'ORDER_DETAIL' })] });
  };

  useEffect(() => {
    if (createdOrder.id) {
      getOrderOnChange(createdOrder.id, (order) => {
        if (order) {
          if (!order.timeRemain && order.status === OrderStatus.ACCEPTANCE) {
            handleAcceptedOrder();
          }
          if (order.status === OrderStatus.REJECTION) {
            handleRejectedOrder();
            dispatch({
              type: ORDER_ACTIONS.CANCEL_ORDER,
            });
          }
        }
      });
    }
  }, [dispatch, createdOrder]);

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
        message={MESSAGES.REJECTED}
        title={MESSAGES.TITLE_NOTIFICATION}
        visible={visibleNotificationModal}
      />
    </>
  );
};

export default withNavigation(CreateOrder);
