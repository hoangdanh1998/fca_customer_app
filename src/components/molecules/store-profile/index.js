import React, { useState } from "react";
import { Image } from "react-native";
import { Content, Card, CardItem } from "native-base";
import StoreCard from "../../atoms/store-card/index";
// import { styles } from "./styles";
import { STORE } from "../../../constants/seeding";

const StoreProfile = (props) => {
  //   var store = props.store;
  var store = STORE;
  return (
    <Content>
      <Card>
        <CardItem cardBody>
          <Image
            source={{
              uri: store.image,
            }}
            style={{ height: 300, width: "100%" }}
          />
        </CardItem>
        <StoreCard store={STORE} />
      </Card>
    </Content>
  );
};

export default StoreProfile;
