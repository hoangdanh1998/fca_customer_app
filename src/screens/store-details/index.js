import React, { useState } from "react";
import { Content, Card, List } from "native-base";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import OrderButton from "../../components/atoms/order-button/index";
import { MENU_DRINK } from "../../constants/seeding";
import { MESSAGES } from "../../constants/index.js";

const StoreDetails = (props) => {
  //   var menuDrink = props.menuDrink;
  var menuDrink = MENU_DRINK;
  return (
    <Content style={{ flex: 1 }}>
      <StoreProfile />
      <Card>
        <List
          dataArray={menuDrink}
          renderRow={(item) => <DrinkCard drink={item} />}
        />
      </Card>
      <OrderButton name={MESSAGES.NEXT} disable={false} />
    </Content>
  );
};

export default StoreDetails;
