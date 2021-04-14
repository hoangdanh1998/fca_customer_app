/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import {
  CardItem,
  Content,
  Footer,
  Right,
  View,
  Left,
  Body,
  Text,
  Card,
} from "native-base";
import { Switch } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FocusedButton from "../../components/atoms/focused-button/index";
import NotificationModal from "../../components/atoms/notification-modal/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import {
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  LANGUAGE,
  MESSAGES,
  OrderStatus,
  PRIMARY_LIGHT_COLOR,
  LIGHT_COLOR,
  DARK_COLOR,
} from "../../constants/index";
import { init, IMLocalized } from "../../i18n/IMLocalized";
import { setStoreSuggestion } from "../../redux/actions/store";
import * as fcaStorage from "../../service/async-storage/async-storage";
import {
  getOrderOnChange,
  setAutoPrepareOrder,
} from "../../service/firebase/firebase-realtime";
import { convertTransaction } from "../../utils/utils";
import { ORDER_ACTIONS } from "./../../redux/action-types/actions";

init(LANGUAGE.VI);
const arrEndpointStatus = [
  OrderStatus.CLOSURE,
  OrderStatus.RECEPTION,
  OrderStatus.REJECTION,
  OrderStatus.CANCELLATION,
];
const canDelayOrderStatus = [
  OrderStatus.INITIALIZATION,
  OrderStatus.ACCEPTANCE,
  OrderStatus.PREPARATION,
];

const OrderDetails = (props) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.createdOrder);
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);

  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNeedHandleDismiss, setIsNeedHandleDismiss] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [listenedOrder, setListenedOrder] = useState(order);
  const [transactionState, setTransactionState] = useState(
    order?.transaction | []
  );
  const [isAutoPrepare, setIsAutoPrepare] = useState(true);
  const [isDisableAutoPrepare, setIsDisableAutoPrepare] = useState(false);
  const [visibleDelayModal, setVisibleDelayModal] = useState(false);

  const handleReceiveQRCode = (qrCode, orderId) => {
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
  };

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

  const handleStaffCancelOrder = () => {
    setVisibleNotificationModal(true);
    setNotificationMessage(MESSAGES.CANCELLED);
    setIsNeedHandleDismiss(true);
    reSuggest();
  };

  const setStatusCreatedOrder = (status) => {
    dispatch({
      type: ORDER_ACTIONS.SET_CREATED_ORDER,
      payload: { ...order, status },
    });
  };

  const handleStaffFinishOrder = () => {
    setVisibleNotificationModal(true);
    fcaStorage.removeOrder();
    setNotificationMessage(MESSAGES.RECEIVED);
  };

  const handleAddTransaction = (newStatus) => {
    const newTransaction = Array.from(transactionState, (transaction) => {
      return transaction;
    });
    if (newStatus === OrderStatus.ACCEPTANCE && transactionState.length === 0) {
      newTransaction.unshift({
        createdAt: moment(order.createdAt),
        toStatus: OrderStatus.INITIALIZATION,
      });
    }
    newTransaction.unshift({ createdAt: moment(), toStatus: newStatus });
    if (!canDelayOrderStatus.includes(listenedOrder.status)) {
      setIsDisableAutoPrepare(true);
    }
    setTransactionState(newTransaction);
  };

  useEffect(() => {
    if (order && arrEndpointStatus.includes(order.status)) {
      setIsComplete(true);
    }
  }, [order]);

  useEffect(() => {
    if (order.id) {
      getOrderOnChange(order.id, (order) => {
        setListenedOrder(order);
      });
    }
  }, []);

  useEffect(() => {
    if (listenedOrder) {
      if (transactionState[0]?.toStatus !== listenedOrder.status) {
        handleAddTransaction(listenedOrder.status);
        setStatusCreatedOrder(listenedOrder.status);
      }
      if (listenedOrder.status === OrderStatus.CANCELLATION) {
        handleStaffCancelOrder();
      }
      if (listenedOrder.status === OrderStatus.RECEPTION) {
        dispatch(setStoreSuggestion(null, null));
      }
      if (
        listenedOrder.status === OrderStatus.RECEPTION &&
        !listenedOrder.qrcode
      ) {
        handleStaffFinishOrder();
      }
      if (listenedOrder.qrcode && listenedOrder.qrcode != "") {
        handleReceiveQRCode(listenedOrder.qrcode, listenedOrder.id);
      }
    }
  }, [listenedOrder]);

  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order?.partner} orderDetails={order} />
          <Card style={{ width: "95%", marginLeft: "2.5%" }}>
            <CardItem>
              <Left style={{ flex: 2 }}>
                <Switch
                  trackColor={{ false: PRIMARY_LIGHT_COLOR, true: DARK_COLOR }}
                  thumbColor={LIGHT_COLOR}
                  ios_backgroundColor={PRIMARY_LIGHT_COLOR}
                  onValueChange={() => {
                    setVisibleDelayModal(true);
                  }}
                  disabled={isDisableAutoPrepare}
                  value={isAutoPrepare}
                />
              </Left>
              <Body style={{ flex: 8 }}>
                <Text>
                  {IMLocalized("wording-message-default-prepare-order")}
                </Text>
              </Body>
            </CardItem>
          </Card>
          {transactionState ? (
            <TimelineTransaction
              date={moment(order?.createdAt, DATE_FORMAT_CALL_API).format(
                DATE_FORMAT
              )}
              transactions={convertTransaction(transactionState)}
            />
          ) : null}
        </View>
      </Content>
      <Footer style={{ backgroundColor: null, justifyContent: "space-around" }}>
        {!isComplete ? (
          <View
            style={{
              flex: 1,
            }}
          >
            <FocusedButton
              block
              name={MESSAGES.DIRECTION}
              disable={false}
              onPress={() => {
                props.navigation.navigate("MAP_NAVIGATION", { order });
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <UnFocusedButton
              bordered
              name={MESSAGES.HOME}
              disable={false}
              onPress={() => {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: "MAP_VIEW",
                      },
                    ],
                  })
                );
              }}
            />
            <FocusedButton
              block
              name={MESSAGES.FEEDBACK}
              disable={false}
              onPress={() => {
                alert("Make feedback");
              }}
            />
          </View>
        )}
      </Footer>
      <NotificationModal
        onDismiss={() => {
          if (isNeedHandleDismiss) {
            setVisibleNotificationModal(false);
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MAP_VIEW",
                  },
                ],
              })
            );
          } else {
            setVisibleNotificationModal(false);
          }
        }}
        message={notificationMessage}
        title={MESSAGES.TITLE_NOTIFICATION}
        visible={visibleNotificationModal}
      />
      <AwesomeAlert
        show={visibleDelayModal}
        showProgress={false}
        title={IMLocalized(`wording-title-confirmation`)}
        message={
          isAutoPrepare
            ? IMLocalized("wording-message-make-order-after-arrive")
            : IMLocalized("wording-message-make-order-before-arrive")
        }
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
          setVisibleDelayModal(false);
        }}
        onCancelPressed={() => {
          setVisibleDelayModal(false);
        }}
        onConfirmPressed={() => {
          setAutoPrepareOrder(order.id, !isAutoPrepare);
          setIsAutoPrepare(!isAutoPrepare);
          setVisibleDelayModal(false);
        }}
      />
    </>
  );
};

export default withNavigation(OrderDetails);
