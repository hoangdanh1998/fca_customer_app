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
import { TouchableWithoutFeedback, ActivityIndicator } from "react-native";
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
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index.js";

import {
  getOrder,
  createEmergency,
  getPartnerInformation,
} from "../../redux/actions/emergency";
import { convertEmergencyToNormal } from "../../utils/utils";

init(LANGUAGE.VI);
const EditEmergencyOrder = (props) => {
  const selectedPartner = props.route.params.selectedPartner;
  const customer = useSelector((state) => state.account.customer);
  const loadedPartner = useSelector((state) => state.emergency.partner);

  const [isLoading, setIsLoading] = useState(true);
  const [displayId, setDisplayId] = useState("");

  const [partner, setPartner] = useState();
  const dispatch = useDispatch();
  const loadPartner = () => {
    try {
      dispatch(getPartnerInformation(selectedPartner.id));
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateItemQuantity = (itemParam, quantityParam) => {
    const totalItem = partner.items?.reduce((sum, i) => {
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
      Toast.show({
        text: IMLocalized("wording-too-less-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      loadPartner();
      return;
    }
    const item = itemParam;
    item.quantity += quantityParam;
    const index = partner.items.findIndex((i) => {
      return i.id === item.id;
    });
    const newPartner = partner;
    newPartner.items[index] = { ...item };
    setPartner({ ...newPartner });
  };
  const handleCreateEmergency = async () => {
    const items = order.items.filter((item) => item.quantity > 0);
    const param = {
      customerId: customer.id,
      destinationId: order.destination.id,
      items: items.map((item) => {
        return {
          partnerItemId: item.id,
          quantity: item.quantity,
          favoriteItemId: isEmergency ? item.favoriteItemId : "",
        };
      }),
    };
    console.log("param", param);
    try {
      await dispatch(createEmergency(param));
      alert("Success!");
      props.navigation.navigate("EMERGENCY_PROFILE");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    loadPartner();
  }, []);
  useEffect(() => {
    setPartner(loadedPartner);
    setIsLoading(false);
    console.log("loadedPartner", loadedPartner);
  }, [loadedPartner]);

  // ================================= HANDLE UI =================================

  return !isLoading ? (
    <Root>
      <Content style={styles.content}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <H3 style={styles.title}>{partner?.name}</H3>
          <Text
            note
            style={{ color: DARK_COLOR, width: "95%", marginLeft: "2.5%" }}
          >
            {partner?.address?.description}
          </Text>
          <List
            dataArray={partner.items}
            renderRow={(item) => (
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
            )}
          />
          <CardItem style={{ flex: 1 }}>
            <Left style={{ flex: 3 }}>
              <H3 style={{ width: "100%", textAlign: "left" }}>
                {IMLocalized("wording-total-price")}
              </H3>
            </Left>
            <Body style={{ flex: 4 }}>
              <H3 style={{ width: "100%", textAlign: "left" }}>
                {partner.items?.reduce((sum, item) => {
                  return (sum += item.quantity);
                }, 0)}
                {` ${IMLocalized("wording-item")}`}
              </H3>
            </Body>
            <Right style={{ flex: 3 }}>
              <NumberFormat
                value={partner.items?.reduce((sum, item) => {
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

          {/* <View
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
            {destination?.label ? (
              <CardItem style={{ flex: 1 }}>
                <Left style={{ flex: 1 }}>
                  <Text note style={{ fontWeight: "bold" }}>
                    {IMLocalized("wording-saved-address-label")}
                  </Text>
                </Left>
                <Body style={{ flex: 4 }}>
                  <Text note>{destination?.label}</Text>
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
                <Text note>{destination?.description}</Text>
              </Body>
            </CardItem>
          </View> */}
        </View>
      </Content>
      {partner.items?.reduce((sum, item) => {
        return (sum += item.quantity);
      }, 0) !== 0 ? (
        <Footer style={styles.footer}>
          <View style={{ flex: 1 }}>
            <FocusedButton
              block
              name={MESSAGES.SAVE}
              disable={false}
              onPress={() => {
                // alert(JSON.stringify(order.items));
                handleCreateEmergency();
              }}
            />
          </View>
        </Footer>
      ) : null}
    </Root>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
    </View>
  );
};

export default withNavigation(EditEmergencyOrder);
