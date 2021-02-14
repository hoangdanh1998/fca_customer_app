import React, { useState } from "react";
import {
  Content,
  Card,
  List,
  Toast,
  Root,
  CardItem,
  Right,
  Left,
  Body,
  Text,
} from "native-base";
import NumberFormat from "react-number-format";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import OrderButton from "../../components/atoms/order-button/index";
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
    setCart(newCart);
    console.log("after", cart);
  };

  return (
    <Root>
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
        {console.log("cart", cart)}
        {cart.quantity > 0 ? (
          <Card
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: LIGHT_COLOR,
            }}
          >
            <CardItem
              style={{
                backgroundColor: LIGHT_COLOR,
              }}
            >
              <Right>
                <Text
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: 20,
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {IMLocalized("wording-cart")}
                </Text>
              </Right>
              <Body>
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: 20,
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {cart.quantity} {IMLocalized("wording-item")}
                </Text>
              </Body>
              <Left>
                <NumberFormat
                  value={cart.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "right",
                        fontSize: 20,
                        color: DARK_COLOR,
                        fontWeight: "bold",
                      }}
                    >
                      {formattedValue} {IMLocalized("currency")}
                    </Text>
                  )}
                />
              </Left>
            </CardItem>
            <OrderButton name={MESSAGES.NEXT} disable={false} />
          </Card>
        ) : null}
        <OrderButton name={cart} disable={false} />
      </Content>
    </Root>
  );
};

export default StoreDetails;
