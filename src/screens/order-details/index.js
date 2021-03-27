/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import { Content, Footer, View } from "native-base";
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
  OrderStatus
} from "../../constants/index";
import { init } from "../../i18n/IMLocalized";
import { resetOrder } from '../../redux/actions/order';
import { setStoreSuggestion } from "../../redux/actions/store";
import * as fcaStorage from '../../service/async-storage/async-storage';
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";
import { convertTransaction } from "../../utils/utils";


init(LANGUAGE.VI);
const OrderDetails = (props) => {
  const dispatch = useDispatch();
  let order;
  const historyTransactions = [];
  if (props.route.params.screenName) {
    order = props.route.params.order;
  } else {
    order = useSelector((state) => {
      return state.order.createdOrder;
    });
  }

  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);

  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNeedHandleDismiss, setIsNeedHandleDismiss] = useState(false);
  const [listenedOrder, setListenedOrder] = useState(order);
  const [transactionState, setTransactionState] = useState(
    props.route.params.screenName ? order.transaction : []
  );
  const [isAfterCreate, setIsAfterCreate] = useState(
    props.route.params.isAfterCreate
  );

  const handleReceiveQRCode = (qrCode, orderId) => {
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
    setIsAfterCreate(false);
  };

  const handleStaffCancelOrder = () => {
    setVisibleNotificationModal(true);
    setNotificationMessage(MESSAGES.CANCELLED);
    setIsNeedHandleDismiss(true);
    const length = suggestionStores.length;
    if (length > 1) {
      const newSuggestion = suggestionStores[length - 2];
      const newSuggestList = suggestionStores.filter(
        (store) => store.id !== bestSuggestion.id
      );
      dispatch(setStoreSuggestion(newSuggestion, newSuggestList));
    }
  };
  

  const handleStaffFinishOrder = () => {
    setVisibleNotificationModal(true);
    fcaStorage.removeOrder();
    dispatch(resetOrder())
    setNotificationMessage(MESSAGES.RECEIVED);
  };

  const handleAddTransaction = (newStatus) => {
    const newTransaction = Array.from(transactionState, (transaction) => {
      return transaction;
    });
    newTransaction.unshift({ createdAt: moment(), toStatus: newStatus });
    setTransactionState(newTransaction);
  };

  useEffect(() => {
    if (order.id) {
      getOrderOnChange(order.id, (order) => {
        setListenedOrder(order);
      });
    }
  }, []);

  useEffect(() => {
    if (transactionState[0]?.toStatus !== listenedOrder.status) {
      handleAddTransaction(listenedOrder.status);
      if (listenedOrder.status === OrderStatus.CANCELLATION) {
        handleStaffCancelOrder();
      }
      if (
        listenedOrder.status === OrderStatus.RECEPTION &&
        !listenedOrder.qrcode
      ) {
        handleStaffFinishOrder();
      }
    }
    if (listenedOrder.qrcode && listenedOrder.qrcode != "") {
      handleReceiveQRCode(listenedOrder.qrcode, listenedOrder.id);
    }
  }, [listenedOrder]);

  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order?.partner} orderDetails={order} />
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
        {isAfterCreate ? (
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
            setIsAfterCreate(false);
          }
        }}
        message={notificationMessage}
        title={MESSAGES.TITLE_NOTIFICATION}
        visible={visibleNotificationModal}
      />
    </>
  );
};

export default withNavigation(OrderDetails);
