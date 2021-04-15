import { Body, Card, CardItem, H3, Left, Text } from "native-base";
import React from "react";
import { Rating } from "react-native-elements";

const StoreCard = (props) => {
  var store = props.store;
  //   var store = STORE;
  return (
    <Card>
      <CardItem style={{ flex: 1, paddingLeft: "-5%" }}>
        <Left>
          <Body>
            <H3>{store?.name}</H3>
            {store?.rate ? (
              <Text note>
                <Rating imageSize={15} readonly startingValue={store?.rate} />
              </Text>
            ) : null}
            <Text>{store?.address ? store?.address?.description : "-"}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default StoreCard;
