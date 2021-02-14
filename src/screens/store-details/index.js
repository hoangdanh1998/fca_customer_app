import React, { useState } from "react";
import { Content, Card, List, Toast, Root } from "native-base";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import OrderButton from "../../components/atoms/order-button/index";
import { MENU_DRINK } from "../../constants/seeding";
import { MESSAGES, MAX_ORDER_ITEM, LANGUAGE } from "../../constants/index.js";

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
    setCart(newCart);
  };

  return (
    <Root style={{ flex: 1 }}>
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
      <OrderButton name={MESSAGES.NEXT} disable={false} />
    </Root>
  );
};

export default StoreDetails;
