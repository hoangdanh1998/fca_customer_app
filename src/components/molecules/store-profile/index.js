import { Card, CardItem, Content } from "native-base";
import React, { useState } from "react";

import { Image } from "react-native";
import StoreCard from "../../atoms/store-card/index";
// import { styles } from "./styles";
import { useSelector } from "react-redux";

const StoreProfile = (props) => {
  const store = props.store;
  return (
    <Content>
      <Card>
        <CardItem cardBody>
          <Image
            source={{
              uri: store?.imageLink,
            }}
            style={{ height: 300, width: "100%" }}
          />
        </CardItem>
        <StoreCard store={store} />
      </Card>
    </Content>
  );
};

export default StoreProfile;
