import { withNavigation } from "@react-navigation/compat";
import { Card, Content, Footer, List, Root, Toast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DrinkCard from "../../components/atoms/drink-card/index";
import StoreCart from "../../components/molecules/store-cart/index";
import StoreProfile from "../../components/molecules/store-profile/index";
import {
  LANGUAGE,
  MAX_ORDER_ITEM,
  NOTICE_DURATION,
  PartnerItemStatus,
  DARK_COLOR,
} from "../../constants/index.js";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { getPartnerInformation } from "../../redux/actions/partner";
import { styles } from "./styles";

const StoreDetails = (props) => {
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
      await dispatch(getPartnerInformation(partnerId));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
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

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={DARK_COLOR} />
    </View>
  ) : (
    <Root>
      <Content style={styles.content}>
        <StoreProfile store={partner} />
        <Card>
          <List
            dataArray={partner?.items?.filter(
              (item) => item.status === PartnerItemStatus.ACTIVE
            )}
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
          <StoreCart store={partner} cart={cart} />
        </Footer>
      ) : null}
    </Root>
  );
};

export default withNavigation(StoreDetails);
