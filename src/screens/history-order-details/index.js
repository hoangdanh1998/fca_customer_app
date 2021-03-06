/* eslint-disable react/prop-types */
import { withNavigation } from "@react-navigation/compat";
import moment from "moment";
import { Card, CardItem, Content, Footer, View, Text } from "native-base";
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
import { IMLocalized, init } from "../../i18n/IMLocalized";
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
          {order.status === OrderStatus.CANCELLATION ? (
            <Card style={{ width: "95%", marginLeft: "2.5%" }}>
              <CardItem style={{ backgroundColor: "#f5f5f5" }}>
                <Text note style={{ fontWeight: "bold" }}>
                  {order?.transaction[0].description
                    ? order?.transaction[0].description
                    : IMLocalized(
                        "wording-message-cancel-order-without-reason"
                      )}
                </Text>
              </CardItem>
            </Card>
          ) : null}
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
                props.navigation.navigate("FEEDBACK", {
                  order,
                  screenName: "HISTORY_ORDER_DETAILS",
                });
              }}
            />
          </View>
        </Footer>
      ) : null}
    </>
  );
};

export default withNavigation(HistoryOrderDetails);
