import { Content, Footer, View } from "native-base";
import {
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  LANGUAGE,
  MESSAGES,
} from "../../constants/index";
import React, { useEffect, useState } from "react";

import FocusedButton from "../../components/atoms/focused-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import { convertTransaction } from "../../utils/utils";
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";
// import { ORDER_TRANSACTIONS } from "../../constants/seeding";
import { init } from "../../i18n/IMLocalized";
import moment from "moment";
import { useSelector } from "react-redux";
/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";

init(LANGUAGE.VI);
const OrderDetails = (props) => {
  const [StatusOrder, setStatusOder] = useState("");
  const transactionOrder=[];
  const [TransactionState, setTransactionState] = useState(transactionOrder)
  const isAfterCreate = props.route.params.isAfterCreate;

  const order = useSelector((state) => {
    return state.order.createdOrder;
  });

  // const [transactions, setTransactions] = useState(ORDER_TRANSACTIONS);
  const [convertedTransactions, setConvertedTransactions] = useState(
    convertTransaction(TransactionState)
  );

  const handleReceiveQRCode = (qrCode, orderId) => {
    console.log("handleReceiveQRCode", qrCode);
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
  };
  
  const handleStatusChange=(status, moment) => {
    transactionOrder.push({toStatus: status, createdAt: moment});
    console.log("OderStatusArray: ",transactionOrder);
  }

  useEffect(() => {
    setConvertedTransactions(convertTransaction(TransactionState));
    if (order.id) {
      getOrderOnChange(order.id, (order) => {
        if (order.qrcode && order.qrcode != "") {
          handleReceiveQRCode(order.qrcode, order.id);
        }
        if (order.status != StatusOrder) {
          setStatusOder(order.status);
          handleStatusChange(order.status, moment());
        }
      });
    }
  }, []);

  const navigateToNavigationPage = () => {
    props.navigation.navigate("MAP_NAVIGATION", { order });
  };
  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order.partner} orderDetails={order} />
          <TimelineTransaction
            date={moment(order.createdAt, DATE_FORMAT_CALL_API).format(
              DATE_FORMAT
            )}
            transactions={convertedTransactions}
          />
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
              justifyContent: "space-around",
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
