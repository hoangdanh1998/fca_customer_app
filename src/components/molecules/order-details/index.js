import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { Card, CardItem, H3, Left, List, Right, Text, View } from "native-base";
// import { styles } from "./styles";
import StoreCard from "../../atoms/store-card/index";
import OrderDetailCard from "../../atoms/order-detail-card/index";
import { ORDER_DETAILS } from "../../../constants/seeding";
import { DARK_COLOR, LANGUAGE } from "../../../constants/index";

import { IMLocalized, init } from "../../../i18n/IMLocalized";

const PreparingOrder = (props) => {
  init(LANGUAGE.VI);
  const orderDetails = props.orderDetails;
  const store = props.store;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4, marginTop: "5%" }}>
        <H3 style={{ color: DARK_COLOR, fontWeight: "bold" }}>
          {IMLocalized("wording-take-order-at")}
        </H3>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <StoreCard store={store} />
        </View>
      </View>
      <View style={{ flex: 6, marginTop: "5%" }}>
        <H3 style={{ color: DARK_COLOR, fontWeight: "bold" }}>
          {IMLocalized("wording-order-information")}
        </H3>
        <Card style={{ width: "95%", marginLeft: "2.5%" }}>
          <List
            dataArray={orderDetails.items}
            renderRow={(item) => <OrderDetailCard item={item} />}
          />
          <CardItem>
            <Left style={{ flex: 2 }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: "left",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: DARK_COLOR,
                }}
              >
                {IMLocalized("wording-total-price")}
              </Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <NumberFormat
                value={orderDetails.total}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(formattedValue) => (
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "left",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: DARK_COLOR,
                    }}
                  >
                    {formattedValue} {IMLocalized("currency")}
                  </Text>
                )}
              />
            </Right>
          </CardItem>
        </Card>
      </View>
    </View>
  );
};

export default PreparingOrder;
