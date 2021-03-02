/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";
import moment from "moment";
import { Content, Footer, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FocusedButton from "../../components/atoms/focused-button/index";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import OrderDetail from "../../components/molecules/order-details/index";
import {
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  LANGUAGE,
  MESSAGES,
} from "../../constants/index";
import { ORDER_TRANSACTIONS } from "../../constants/seeding";
import { init } from "../../i18n/IMLocalized";
import { convertTransaction } from "../../utils/utils";
import { getOrderOnChange } from "../../service/firebase/firebase-realtime";

init(LANGUAGE.VI);
const OrderDetails = (props) => {
  const isAfterCreate = props.route.params.isAfterCreate;

  const order = useSelector((state) => {
    return state.order.createdOrder;
  });

  const [transactions, setTransactions] = useState(ORDER_TRANSACTIONS);
  const [convertedTransactions, setConvertedTransactions] = useState(
    convertTransaction(ORDER_TRANSACTIONS)
  );

  const handleReceiveQRCode = (qrCode, orderId) => {
    console.log("handleReceiveQRCode", qrCode);
    props.navigation.navigate("QR_CODE", {
      qrCode: qrCode,
      orderId: orderId,
    });
  };

  useEffect(() => {
    setConvertedTransactions(convertTransaction(transactions));
    if (order.id) {
      getOrderOnChange(order.id, (order) => {
        if (order.qrcode && order.qrcode != "") {
          handleReceiveQRCode(order.qrcode, order.id);
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
