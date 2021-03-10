import { CART_MENU_DRINK, MENU_DRINK } from "../../constants/seeding";
import {
  Card,
  Content,
  Footer,
  Header,
  List,
  Root,
  Text,
  Toast,
} from "native-base";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  LANGUAGE,
  MAX_ORDER_ITEM,
  NOTICE_DURATION,
} from "../../constants/index.js";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DrinkCard from "../../components/atoms/drink-card/index";
import EmergencyCart from "../../components/molecules/emergency-cart/index";
import StoreProfile from "../../components/molecules/store-profile/index";
import { getPartnerInformation } from "../../redux/actions/partner";
import { styles } from "./styles";
import { withNavigation } from "@react-navigation/compat";

const StoreDefault = (props) => {
  init(LANGUAGE.VI);

  const partnerId = props.route.params.partnerId;
  const partner = useSelector((state) => {
    return state.partner.partner;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [notificationId, setNotificationId] = useState();
  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });

  const dispatch = useDispatch();
  const loadPartner = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(
        // getPartnerInformation("1ceee651-7dea-4a0f-b517-b49166cb6cfb")
        getPartnerInformation(partnerId)
      );
    } catch (error) {
      setError(error);
    }
  }, [dispatch, setIsLoading]);
  useEffect(() => {
    loadPartner();
  }, [dispatch, loadPartner]);

  // ================================= HANDLE UI =================================

  const updateCart = (item, quantity) => {
    var newCart = { ...cart };
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

    if (item.quantity <= 0) {
      newCart.items.splice(index, 1);
    } else {
      if (index === -1) {
        newCart.items.push(item);
      } else {
        newCart.items[index] = item;
      }
    }

    newCart.quantity += quantity;

    newCart.total += quantity * parseInt(item.price);

    setCart({ ...cart, ...newCart });
  };

  return (
    <Root>
      <Content style={styles.content}>
        <StoreProfile store={partner} />
        <Card>
          <List
            dataArray={partner.items}
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
          <EmergencyCart store={partner} cart={cart} />
        </Footer>
      ) : null}
    </Root>
  );
};

export default withNavigation(StoreDefault);
