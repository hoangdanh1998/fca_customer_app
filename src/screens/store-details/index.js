import React, { useState, useEffect } from "react";
import { Content, Card, List, Toast, Root, Footer, Header } from "native-base";
import { styles } from "./styles";
import StoreProfile from "../../components/molecules/store-profile/index";
import DrinkCard from "../../components/atoms/drink-card/index";
import StoreCard from "../../components/molecules/store-cart/index";
import { MENU_DRINK, CART_MENU_DRINK } from "../../constants/seeding";
import {useSelector} from 'react-redux';
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

  const store = useSelector(state => state.store.store);

  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });

  const updateCart = (item, quantity) => {
    var newCart = {...cart};
    if (newCart.quantity >= MAX_ORDER_ITEM && quantity > 0) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      return;
    }
    const index = newCart.items.findIndex((cartItem) => {
      return cartItem.id === item.id;
    });

    //update quantity of item
    item.quantity += quantity;
    console.log("item quantity: ", item.quantity);

    if(item.quantity <= 0) {
      newCart.items.splice(index,1);
    } else {
      if(index === -1) {
        newCart.items.push(item);
      }else {
        newCart.items[index] = item;
      }
    }
    
    newCart.quantity += quantity;
    
    newCart.total += quantity * parseInt(item.price);
    
    setCart({ ...cart, ...newCart });
  };

  useEffect(() => {
    console.log("cart",cart);
  },[cart])

  return (
    <Root>
      {/* <Header /> */}
      <Content style={styles.content}>
        <StoreProfile store = {store}/>
        <Card>
          <List
            dataArray={menuDrink}
            keyExtractor={(item) => item.id}
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
          <StoreCard store={store} cart={cart} />
        </Footer>
      ) : null}
    </Root>
  );
};

export default StoreDetails;
