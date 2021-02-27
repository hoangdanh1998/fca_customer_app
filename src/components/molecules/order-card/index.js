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
import { styles } from "./styles";
import { ORDER } from "../../../constants/seeding.js";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";

const OrderCard = (props) => {
  var order = props.order;
  // var order = ORDER;
  init(LANGUAGE.VI);
  return (
    <Content>
      <Card style={styles.card}>
        <CardItem style={styles.card1st}>
          <Left style={styles.orderStatus}>
            <Text>{IMLocalized(order.orderStatus.toLowerCase())}</Text>
          </Left>
          <Right>
            <Text>{order.createdAt}</Text>
          </Right>
        </CardItem>
        <CardItem style={styles.card2nd}>
          <Left>
            <Content style={styles.orderContent}>
              <H3 style={styles.storeName}>{order.storeName}</H3>
              <Text>
                <NumberFormat
                  value={order.orderAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text>
                      {formattedValue} {IMLocalized("currency")} -{" "}
                      {order.orderItems} {IMLocalized("wording-item")}
                    </Text>
                  )}
                />
              </Text>
            </Content>
          </Left>
          <Right>
            <Icon
              button
              onPress={() => alert("This is Card Header")}
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
