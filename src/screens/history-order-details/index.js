/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";
import moment from "moment";
import { Content, Footer, View } from "native-base";
import React from "react";
import FocusedButton from "../../components/atoms/focused-button/index";
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
  const orderTransaction = Array.from(
    props.route.params.order.transaction,
    (t) => {
      return t;
    }
  );
  const transaction = orderTransaction.sort((a, b) => {
    return (
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() < 0
    );
  });
  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order.partner} orderDetails={order} />
          {order.transaction ? (
            <TimelineTransaction
              date={moment(order.createdAt, DATE_FORMAT_CALL_API).format(
                DATE_FORMAT
              )}
              transactions={convertTransaction(transaction)}
            />
          ) : null}
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
