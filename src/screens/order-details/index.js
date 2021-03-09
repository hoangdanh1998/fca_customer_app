import { Content, Footer, View } from "native-base";
import {
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  LANGUAGE,
  MESSAGES,
  OrderStatus,
} from "../../constants/index";
import React, { useEffect, useState } from "react";

import FocusedButton from "../../components/atoms/focused-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import { convertTransaction } from "../../utils/utils";
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";
import { init } from "../../i18n/IMLocalized";
import moment from "moment";
import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";

init(LANGUAGE.VI);
const OrderDetails = (props) => {
  const order = useSelector((state) => {
    return state.order.createdOrder;
  });
  const isAfterCreate = props.route.params.isAfterCreate;
  const firstTransaction = [
    { createdAt: moment(), toStatus: OrderStatus.ACCEPTANCE },
    {
      createdAt: moment(order.createdAt),
      toStatus: OrderStatus.INITIALIZATION,
    },
  ];

  const handleReceiveQRCode = (qrCode, orderId) => {
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
  };

  const [transactionState, setTransactionState] = useState(firstTransaction);
  const handleAddTransaction = (newStatus) => {
    const newTransaction = Array.from(transactionState, (transaction) => {
      return transaction;
    });
    newTransaction.unshift({ createdAt: moment(), toStatus: newStatus });
    setTransactionState(newTransaction);
  };

  useEffect(() => {
    console.log("order", order.id);
    if (order.id) {
      getOrderOnChange(order.id, (order) => {
        if (order.qrcode && order.qrcode != "") {
          handleReceiveQRCode(order.qrcode, order.id);
        }
        if (transactionState[0].toStatus !== order.status) {
          handleAddTransaction(order.status);
        }
      });
    }
  }, [transactionState]);

  const navigateToNavigationPage = () => {
    props.navigation.navigate("MAP_NAVIGATION", { order });
  };
  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order.partner} orderDetails={order} />
          {transactionState ? (
            <TimelineTransaction
              date={moment(order.createdAt, DATE_FORMAT_CALL_API).format(
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
                navigateToNavigationPage();
              }}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <UnFocusedButton
              bordered
              name={MESSAGES.HOME}
              disable={false}
              onPress={() => {
                props.navigation.navigate("MAP_VIEW");
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
    </>
  );
};

export default withNavigation(OrderDetails);
