import React, { useState } from "react";
import {
  Content,
  Card,
  List,
  Toast,
  Root,
  CardItem,
  Right,
  Left,
  Body,
  Text,
} from "native-base";
import NumberFormat from "react-number-format";
import OrderButton from "../../../components/atoms/order-button/index";
import { MENU_DRINK } from "../../../constants/seeding";
import {
  MESSAGES,
  MAX_ORDER_ITEM,
  LANGUAGE,
  DARK_COLOR,
  LIGHT_COLOR,
} from "../../../constants/index";

import { IMLocalized, init } from "../../../i18n/IMLocalized";

const StoreCart = (props) => {
  init(LANGUAGE.VI);
  var cart = props.cart;
  //   var menuDrink = MENU_DRINK;

  return (
    <Card style={{ flex: 1, backgroundColor: LIGHT_COLOR }}>
      <CardItem
        style={{
          backgroundColor: LIGHT_COLOR,
        }}
      >
        <Right>
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 20,
              color: DARK_COLOR,
              fontWeight: "bold",
            }}
          >
            {IMLocalized("wording-cart")}
          </Text>
        </Right>
        <Body>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
              color: DARK_COLOR,
              fontWeight: "bold",
            }}
          >
            {cart.quantity} {IMLocalized("wording-item")}
          </Text>
        </Body>
        <Left>
          <NumberFormat
            value={cart.total}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(formattedValue) => (
              <Text
                style={{
                  width: "100%",
                  textAlign: "right",
                  fontSize: 20,
                  color: DARK_COLOR,
                  fontWeight: "bold",
                }}
              >
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
