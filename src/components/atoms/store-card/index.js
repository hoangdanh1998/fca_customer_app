import React, { useState } from "react";
import { Card, CardItem, Text, H3, Left, Body } from "native-base";
import { Rating } from "react-native-elements";
import { STORE } from "../../../constants/seeding";

const StoreCard = (props) => {
  var store = props.store;
  //   var store = STORE;
  return (
    <Card>
      <CardItem style={{ flex: 1, paddingLeft: "-5%" }}>
        <Left>
          <Body>
            <H3>{store.name}</H3>
            {store.rate ? (
              <Text note>
                <Rating imageSize={15} readonly startingValue={store.rate} />
              </Text>
            ) : null}
            <Text>{store.address.description}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default StoreCard;
