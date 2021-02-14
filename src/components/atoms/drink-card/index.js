import React, { useState } from "react";
import { Image } from "react-native";
import { Body, Left, Right, Icon, Text, CardItem } from "native-base";
import NumberFormat from "react-number-format";
import { styles } from "./styles";
import { DRINK } from "../../../constants/seeding";
import { LANGUAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";

const DrinkCard = (props) => {
  var drink = props.drink;
  //   var drink = DRINK;
  init(LANGUAGE.VI);
  return (
    <CardItem style={styles.container}>
      <Left>
        <Image
          source={{
            uri: drink.image,
          }}
          style={styles.image}
        />
      </Left>
      <Body style={styles.body}>
        <Text style={styles.name}>{drink.name}</Text>
        <NumberFormat
          value={drink.price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(formattedValue) => (
            <Text note style={styles.price}>
              {formattedValue} {IMLocalized("currency")}
            </Text>
          )}
        />
      </Body>
      <Right style={styles.right}>
        <Icon
          button
          onPress={props.addItem}
          android={"add-circle-outline"}
          name="add-circle-outline"
        />
      </Right>
    </CardItem>
  );
};

export default DrinkCard;
