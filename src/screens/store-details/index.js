import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import {
  Content,
  Card,
  List,
  Toast,
  Root,
  Text,
  Footer,
  Header,
} from "native-base";
import NumberFormat from "react-number-format";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import OrderButton from "../../components/atoms/order-button/index";
import StoreCard from "../../components/molecules/store-cart/index";
import { MENU_DRINK } from "../../constants/seeding";
import {
  MESSAGES,
  MAX_ORDER_ITEM,
  LANGUAGE,
  DARK_COLOR,
  LIGHT_COLOR,
} from "../../constants/index.js";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const StoreDetails = (props) => {
  init(LANGUAGE.VI);
  //   var menuDrink = props.menuDrink;
  var menuDrink = MENU_DRINK;

  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });

  const updateCart = (item, quantity) => {
    console.log("before", cart);
    var newCart = cart;
    if (newCart.quantity >= MAX_ORDER_ITEM) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: 3000,
        position: "bottom",
      });
      return;
    }
    newCart.items.push(item);
    newCart.quantity += quantity;
    newCart.total += parseInt(item.price);
    setCart({ ...cart, ...newCart });
    console.log("after", cart);
  };

  return (
    <Root>
      <Header />
      <Content style={{ flex: 1 }}>
        <StoreProfile />
        <Card>
          <List
            dataArray={menuDrink}
            renderRow={(item) => (
              <DrinkCard
                addItem={() => {
                  updateCart(item, 1);
                }}
                removeItem={() => {
                  updateCart(item, -1);
                }}
                drink={item}
              />
            )}
          />
        </Card>
        {/* {cart.quantity > 0 ? <StoreCard cart={cart} /> : null} */}
      </Content>
      <Footer
        style={{
          height: "auto",
          backgroundColor: "white",
          borderColor: LIGHT_COLOR,
        }}
      >
        {cart.quantity > 0 ? <StoreCard cart={cart} /> : null}
      </Footer>
    </Root>
  );
};

export default StoreDetails;
