/* eslint-disable react/prop-types */

import { withNavigation } from "@react-navigation/compat";
import { CardItem, Left, Right } from "native-base";
import React from "react";
import { Image, Text, View } from "react-native";
import { LANGUAGE } from "../../../constants/index";
import { init } from "../../../i18n/IMLocalized";

const StoreProfileWithAvatar = (props) => {
  init(LANGUAGE.VI);
  const { store, selectedColor } = props;
  return (
    <CardItem style={{ backgroundColor: selectedColor ? selectedColor : null }}>
      <Left style={{ flex: 1 }}>
        <Image
          source={{
            uri: store?.imageLink,
          }}
          style={{ height: 100, width: "100%" }}
        />
      </Left>
      <Right style={{ flex: 2, justifyContent: "flex-end" }}>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "left",
            width: "95%",
          }}
        >
          {store?.name}
        </Text>
        <Text></Text>
        <Text style={{ textAlign: "left", width: "95%" }}>
          {store?.address?.description}
        </Text>
      </Right>
    </CardItem>
  );
};
export default withNavigation(StoreProfileWithAvatar);
