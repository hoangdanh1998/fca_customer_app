import React, { useState } from "react";
import { Card, CardItem, Right, Left, Body, Text } from "native-base";
import NumberFormat from "react-number-format";
import { styles } from "./styles";
import OrderButton from "../../../components/atoms/order-button/index";
import { MESSAGES, LANGUAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";

const StoreCart = (props) => {
  init(LANGUAGE.VI);
  var cart = props.cart;

  return (
    <Card style={styles.card}>
      <CardItem style={styles.item}>
        <Right>
          <Text style={styles.right}>{IMLocalized("wording-cart")}</Text>
        </Right>
        <Body>
          <Text style={styles.body}>
            {cart.quantity} {IMLocalized("wording-item")}
          </Text>
        </Body>
        <Left>
          <NumberFormat
            value={cart.total}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(formattedValue) => (
              <Text style={styles.left}>
                {formattedValue} {IMLocalized("currency")}
              </Text>
            )}
          />
        </Left>
      </CardItem>
      <OrderButton name={MESSAGES.NEXT} />
    </Card>
  );
};

export default StoreCart;
