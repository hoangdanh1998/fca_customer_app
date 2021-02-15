import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import { Body, Left, Right, Icon, CardItem } from "native-base";
import NumberFormat from "react-number-format";
import { styles } from "./styles";
import { DRINK } from "../../../constants/seeding";
import { LANGUAGE, IMAGE_2, IMAGE_1 } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";

const OrderDetailCard = (props) => {
  var item = props.item;
  //   var item = item;
  init(LANGUAGE.VI);
  return (
    <CardItem style={styles.container}>
      <Left style={styles.left}>
        <Image
          source={item.quantity == 1 ? IMAGE_1 : IMAGE_2}
          style={styles.image}
        />
      </Left>
      <Body style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
      </Body>
      <Right style={styles.right}>
        <NumberFormat
          value={item.price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(formattedValue) => (
            <Text note style={styles.price}>
              {formattedValue} {IMLocalized("currency")}
            </Text>
          )}
        />
      </Right>
    </CardItem>
  );
};

export default OrderDetailCard;
