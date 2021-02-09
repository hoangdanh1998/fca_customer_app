import React, { useState } from "react";
import {
  Content,
  Card,
  CardItem,
  Text,
  H3,
  Left,
  Right,
  Icon,
} from "native-base";
import NumberFormat from "react-number-format";
import { styles } from "./styles";
import { ORDER } from "../../../constants/seeding.js";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";

const OrderCard = (props) => {
  //   var order = props.order;
  var order = ORDER;
  init(LANGUAGE.VI);
  return (
    <Content>
      <Card style={styles.card}>
        <CardItem>
          <Left>
            {/* <Text>{convertStringToCamel(order.orderStatus)}</Text> */}
            <Text>{IMLocalized(order.orderStatus.toLowerCase())}</Text>
          </Left>
          <Right>
            <Text>{order.createdAt}</Text>
          </Right>
        </CardItem>
        <CardItem style={{ paddingTop: "1%" }}>
          <Left>
            <Content style={{ paddingLeft: "4%" }}>
              <H3 style={styles.storeName}>{order.storeName}</H3>
              <Text>
                <NumberFormat
                  value={order.orderAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text>
                      {formattedValue} VND - {order.orderItems}{" "}
                      {IMLocalized("wording-item")}
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
