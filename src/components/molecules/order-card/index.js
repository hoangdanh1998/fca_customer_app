import React, { useState } from "react";
import {
  Card,
  CardItem,
  Content,
  H3,
  Icon,
  Left,
  Right,
  Text,
} from "native-base";
import NumberFormat from "react-number-format";
import moment from "moment";
import { styles } from "./styles";
import { ORDER } from "../../../constants/seeding.js";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import {
  LANGUAGE,
  DATE_TIME_FORMAT_CALL_API,
  DATE_TIME_FORMAT,
  OrderStatus,
  DARK_COLOR,
} from "../../../constants/index.js";

const OrderCard = (props) => {
  var order = props.order;
  // var order = ORDER;
  init(LANGUAGE.VI);
  const statusTextColor = () => {
    switch (order.status) {
      case OrderStatus.CANCELLATION:
        return "grey";
      case OrderStatus.REJECTION:
        return "grey";
      case OrderStatus.CLOSURE:
        return PRIMARY_LIGHT_COLOR;
      default:
        return "black";
    }
  };
  return (
    <Content>
      <Card
        onPress={() => {
          props.onNext(order);
        }}
        style={styles.card}
      >
        <CardItem style={styles.card1st}>
          <Left style={styles.orderStatus}>
            <Text note style={{ color: statusTextColor() }}>
              {IMLocalized(order.status.toLowerCase())}
            </Text>
          </Left>
          <Right>
            <Text>{moment(order.createdAt).format(DATE_TIME_FORMAT)}</Text>
          </Right>
        </CardItem>
        <CardItem style={styles.card2nd}>
          <Left>
            <Content style={styles.orderContent}>
              <H3 style={styles.storeName}>{order.partner.name}</H3>
              <Text>
                <NumberFormat
                  value={order.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text>
                      {formattedValue} {IMLocalized("currency")} -{" "}
                      {order.items.length} {IMLocalized("wording-item")}
                    </Text>
                  )}
                />
              </Text>
            </Content>
          </Left>
          <Right>
            <Icon
              button
              onPress={() => {
                props.onNext(order);
              }}
              android={"chevron-forward"}
              name="arrow-forward"
              style={styles.icon}
            />
          </Right>
        </CardItem>
      </Card>
    </Content>
  );
};

export default OrderCard;
