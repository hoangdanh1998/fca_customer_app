import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardItem,
  Content,
  Left,
  List,
  Text,
  Body,
  H3,
  View,
  Footer,
  ListItem,
  Right,
  Root,
  Toast,
} from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import NumberFormat from "react-number-format";
import { withNavigation } from "@react-navigation/compat";
import { Divider } from "react-native-elements";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import EditQuantityModal from "../../components/atoms/edit-quantity-modal/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_ORDER } from "../../constants/seeding";
import {
  LANGUAGE,
  DARK_COLOR,
  MESSAGES,
  MAX_ORDER_ITEM,
  NOTICE_DURATION,
} from "../../constants/index.js";

import { getOrder } from "../../redux/actions/order";

init(LANGUAGE.VI);
const EditEmergencyOrder = (props) => {
  const loadedOrder = useSelector((state) => {
    return state.order.prepareEmergencyOrder;
  });
  const originOrder = useSelector((state) => {
    return state.order.originalPrepareEmergencyOrder;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [displayId, setDisplayId] = useState("");
  const [order, setOrder] = useState();
  const dispatch = useDispatch();
  const loadOrder = () => {
    try {
      dispatch(getOrder(props.route.params.id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateItemQuantity = (itemParam, quantityParam) => {
    const totalItem = order?.items?.reduce((sum, i) => {
      return (sum += i.quantity);
    }, 0);
    if (totalItem >= MAX_ORDER_ITEM && quantityParam > 0) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      return;
    }
    if (totalItem <= 1 && quantityParam < 0) {
      console.log("totalItem <= 1 && quantityParam < 0");
      Toast.show({
        text: IMLocalized("wording-too-less-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      loadOrder();
      return;
    }
    const item = itemParam;
    item.quantity += quantityParam;
    const index = order.items.findIndex((i) => {
      return i.id === item.id;
    });
    const newOrder = order;
    newOrder.items[index] = { ...item };
    setOrder({ ...newOrder });
  };
  useEffect(() => {
    loadOrder();
  }, []);
  useEffect(() => {
    setOrder(loadedOrder);
    setIsLoading(false);
  }, [loadedOrder]);

  // ================================= HANDLE UI =================================

  return order ? (
    <Root>
      <Content style={styles.content}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <H3 style={styles.title}>{order?.partner?.name}</H3>
          <Text
            note
            style={{ color: DARK_COLOR, width: "95%", marginLeft: "2.5%" }}
          >
            {order?.partner?.address?.description}
          </Text>
          <List
            dataArray={order?.items}
            renderRow={(item) =>
              item.quantity > 0 ? (
                <>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setDisplayId(displayId === item.id ? "" : item.id);
                    }}
                  >
                    <View>
                      <OrderDetailCard item={item} />
                      <Divider style={{ backgroundColor: DARK_COLOR }} />
                    </View>
                  </TouchableWithoutFeedback>
                  <EditQuantityModal
                    item={item}
                    visible={item.id === displayId ? "flex" : "none"}
                    removeItem={() => updateItemQuantity(item, -1)}
                    addItem={() => updateItemQuantity(item, 1)}
                  />
                </>
              ) : (
                <View></View>
              )
            }
          />
          <CardItem style={{ flex: 1 }}>
            <Left style={{ flex: 3 }}>
              <H3 style={{ width: "100%", textAlign: "left" }}>
                {IMLocalized("wording-total-price")}
              </H3>
            </Left>
            <Body style={{ flex: 4 }}>
              <H3 style={{ width: "100%", textAlign: "left" }}>
                {order?.items?.reduce((sum, item) => {
                  return (sum += item.quantity);
                }, 0)}
                {` ${IMLocalized("wording-item")}`}
              </H3>
            </Body>
            <Right style={{ flex: 3 }}>
              <NumberFormat
                // value={order?.total}
                value={order?.items?.reduce((sum, item) => {
                  return (sum += item.quantity * item.price);
                }, 0)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(formattedValue) => (
                  <H3 style={{ width: "100%", textAlign: "right" }}>
                    {formattedValue} {IMLocalized("currency")}
                  </H3>
                )}
              />
            </Right>
          </CardItem>

          <View
            style={{
              flex: 1,
              marginTop: "5%",
              width: "95%",
              marginLeft: "2.5%",
            }}
          >
            <Text note style={{ fontWeight: "bold" }}>
              {IMLocalized("wording-order-destination")}
            </Text>
            {order?.destination?.label ? (
              <CardItem style={{ flex: 1 }}>
                <Left style={{ flex: 1 }}>
                  <Text note style={{ fontWeight: "bold" }}>
                    {IMLocalized("wording-saved-address-label")}
                  </Text>
                </Left>
                <Body style={{ flex: 4 }}>
                  <Text note>{order?.destination?.label}</Text>
                </Body>
              </CardItem>
            ) : null}
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Text note style={{ fontWeight: "bold" }}>
                  {IMLocalized("wording-address")}
                </Text>
              </Left>
              <Body style={{ flex: 4 }}>
                <Text note>{order?.destination?.description}</Text>
              </Body>
            </CardItem>
          </View>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <View style={{ flex: 1 }}>
          <FocusedButton
            block
            name={MESSAGES.SET_DEFAULT}
            disable={false}
            onPress={() => {
              alert(JSON.stringify(order.items));
            }}
          />
        </View>
      </Footer>
    </Root>
  ) : (
    <View></View>
  );
};

export default withNavigation(EditEmergencyOrder);
