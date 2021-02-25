import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Content, Footer, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import CancelButton from "../../components/atoms/cancel-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import {
  LANGUAGE,
  MESSAGES,
  LIGHT_COLOR,
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  DATE_TIME_FORMAT_CALL_API,
  TIME_FORMAT,
} from "../../constants/index";
import { ORDER_TRANSACTIONS } from "../../constants/seeding";

import { IMLocalized, init } from "../../i18n/IMLocalized";
import { convertTransaction } from "../../utils/utils";
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";

const OrderDetails = (props) => {
  // ================================= HANDLE NAVIGATOR =================================
  const order = useSelector((state) => {
    return state.order.createdOrder;
  });
  const [transactions, setTransactions] = useState(ORDER_TRANSACTIONS);
  const [convertedTransactions, setConvertedTransactions] = useState(
    convertTransaction(ORDER_TRANSACTIONS)
  );

  useEffect(() => {
    props.navigation.addListener("beforeRemove", (e) => {
      console.log(e.data.action);
      e.preventDefault();
    });
    setConvertedTransactions(convertTransaction(transactions));
  }, []);

  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
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
        <View style={{ flex: 1 }}>
          <OrderButton
            block
            name={MESSAGES.DIRECTION}
            onPress={() => {}}
            disable={false}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(OrderDetails);
