import React, { useState } from "react";
import { Content, Card, List, Toast, Root, Footer, Header } from "native-base";
import { styles } from "./styles";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import StoreCard from "../../components/molecules/store-cart/index";
import { MENU_DRINK, CART_MENU_DRINK } from "../../constants/seeding";
import {
  MAX_ORDER_ITEM,
  LANGUAGE,
  NOTICE_DURATION,
} from "../../constants/index.js";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const StoreDetails = (props) => {
  init(LANGUAGE.VI);
  //   var menuDrink = props.menuDrink;
  // convert MENU_DRINK to CART_MENU_DRINK
  var menuDrink = CART_MENU_DRINK;

  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });

  const updateCart = (item, quantity) => {
    var newCart = cart;
    if (newCart.quantity >= MAX_ORDER_ITEM && quantity > 0) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      return;
    }
    newCart.items.push(item);
    newCart.quantity += quantity;
    newCart.total += quantity * parseInt(item.price);
    item.quantity += quantity;
    setCart({ ...cart, ...newCart });
  };

  return (
    <Root>
      {/* <Header /> */}
      <Content style={styles.content}>
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
                cart={cart.quantity}
              />
            )}
          />
        </Card>
      </Content>
      {cart.quantity > 0 ? (
        <Footer style={styles.footer}>
          <StoreCard cart={cart} />
        </Footer>
      ) : null}
    </Root>
  );
};

export default StoreDetails;
