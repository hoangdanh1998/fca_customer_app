import React, { useState } from "react";
import { Content, Footer, Header, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import { MENU_DRINK, CART_MENU_DRINK } from "../../constants/seeding";
import { LANGUAGE } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const CreateOrder = (props) => {
  init(LANGUAGE.VI);
  //   var menuDrink = props.menuDrink;

  return (
    <>
      <Header />
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail />
        </View>
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <OrderButton name="order" disable={false} />
        </View>
      </Footer>
    </>
  );
};

export default CreateOrder;
