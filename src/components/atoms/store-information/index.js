import React, { useState } from "react";
import { Content, Card, CardItem, Text, H3, Left, Body } from "native-base";
import { Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-elements";
// import { styles } from "./styles";
import { STORE } from "../../../constants/seeding";

const StoreInformation = (props) => {
  var store = props.store;
  //   var store = STORE;
  return (
    <Content>
      <Card>
        {/* <CardItem cardBody>
          <Image
            source={{
              uri: store.image,
            }}
            style={{ height: 200, width: "100%" }}
          />
        </CardItem> */}
        <CardItem>
          <Left>
            <Body>
              <H3>{store.name}</H3>
              <Text note>
                <Rating imageSize={15} readonly startingValue={store.rate} />
              </Text>
              <Text>{store.address}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    </Content>
  );
};

export default StoreInformation;
