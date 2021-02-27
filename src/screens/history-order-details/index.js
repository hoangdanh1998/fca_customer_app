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
  OrderStatus,
} from "../../constants/index";
import { ORDER_TRANSACTIONS } from "../../constants/seeding";
import { init } from "../../i18n/IMLocalized";
import { convertTransaction } from "../../utils/utils";

init(LANGUAGE.VI);
const HistoryOrderDetails = (props) => {
  const order = props.route.params.order;
  const [transactions, setTransactions] = useState(ORDER_TRANSACTIONS);
  const [convertedTransactions, setConvertedTransactions] = useState(
    convertTransaction(ORDER_TRANSACTIONS)
  );
  useEffect(() => {
    setConvertedTransactions(convertTransaction(transactions));
  }, []);
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

      {order.status === OrderStatus.RECEPTION ? (
        <Footer
          style={{ backgroundColor: null, justifyContent: "space-around" }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <FocusedButton
              block
              name={MESSAGES.FEEDBACK}
              disable={false}
              onPress={() => {
                alert("Do feedback");
              }}
            />
          </View>
        </Footer>
      ) : null}
    </>
  );
};

export default withNavigation(HistoryOrderDetails);
