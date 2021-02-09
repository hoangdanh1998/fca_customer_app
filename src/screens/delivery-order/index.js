import React, { useState } from "react";
import { View, Image } from "react-native";
import { Content, Text, Button, Toast, Root } from "native-base";
// import { styles } from "./styles";
import { QR_CODE_BASE64 } from "../../constants/seeding";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { LANGUAGE } from "../../constants/index.js";

const DeliveryOrder = (props) => {
  //   var imageBase64 = props.imageString;
  var imageBase64 = QR_CODE_BASE64;
  init(LANGUAGE.VI);
  return (
    <Root style={{ flex: 1 }}>
      <Image
        style={{
          borderWidth: 1,
          borderColor: "black",
          width: 300,
          height: 300,
          marginVertical: "70%",
          marginHorizontal: "15%",
          resizeMode: "contain",
          flex: 1,
        }}
        source={{ uri: imageBase64 }}
      />
    </Root>
  );
};

export default DeliveryOrder;
