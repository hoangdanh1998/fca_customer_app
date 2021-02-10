import React, { useState } from "react";
import { Image } from "react-native";
import { Content, Body, Left, Right, Icon, Text } from "native-base";
import NumberFormat from "react-number-format";
import { DRINK } from "../../../constants/seeding.js";

const DrinkCard = (props) => {
  //   var drink = props.drink;
  var drink = DRINK;
  return (
    <Content style={{ flex: 1 }}>
      <Left>
        <Image
          source={{
            uri: drink.image,
          }}
          style={{ height: 100, width: "100%" }}
        />
      </Left>
      <Body>
        <Text>{drink.name}</Text>
        <Text note>{drink.price}</Text>
      </Body>
      <Right>
        <Icon
          button
          onPress={() => alert("This is Card Header")}
          android={"add-circle-outline"}
          name="add-circle-outline"
        />
      </Right>
    </Content>
  );
};

export default DrinkCard;
