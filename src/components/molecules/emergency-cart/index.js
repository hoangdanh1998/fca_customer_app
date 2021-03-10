import React, { useState } from "react";
import { Body, Card, CardItem, Left, Right, Text } from "native-base";
import NumberFormat from "react-number-format";
import { styles } from "./styles";
import FocusedButton from "../../../components/atoms/focused-button/index";
import { LANGUAGE, MESSAGES } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { withNavigation } from "@react-navigation/compat";

const EmergencyCart = (props) => {
  init(LANGUAGE.VI);
  const cart = props.cart;
  const store = props.store;

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
      <FocusedButton
        onPress={() =>
          // props.navigation.navigate("CREATE_ORDER", {
          //   cart: cart,
          //   store: store,
          // })
          alert('set emergency cart')
        }
        name={MESSAGES.SAVE}
        block
      />
    </Card>
  );
};

export default withNavigation(EmergencyCart);
