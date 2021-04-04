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
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import { Divider } from "react-native-elements";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_ORDER } from "../../constants/seeding";
import { LANGUAGE, DARK_COLOR, MESSAGES } from "../../constants/index.js";

import { getPartnerInformation } from "../../redux/actions/partner";

const EditEmergencyOrder = (props) => {
  init(LANGUAGE.VI);
  const order = EMERGENCY_ORDER;

  // ================================= HANDLE UI =================================

  return (
    <>
      <Content style={styles.content}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <H3 style={styles.title}>{order.partner.name}</H3>
          <Text
            note
            style={{ color: DARK_COLOR, width: "95%", marginLeft: "2.5%" }}
          >
            {order.partner.address.description}
          </Text>
          <List
            dataArray={order.items}
            renderRow={(item) => (
              <>
                <OrderDetailCard item={Object.assign({}, item)} />
                <Divider style={{ backgroundColor: DARK_COLOR }} />
              </>
            )}
          />
          <View
            style={{
              flex: 1,
              marginTop: "5%",
              width: "95%",
              marginLeft: "2.5%",
            }}
          >
            <Text note style={{ fontWeight: "bold" }}>
              {IMLocalized("wording-saved-address")}
            </Text>
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Text note style={{ fontWeight: "bold" }}>
                  {IMLocalized("wording-saved-address-label")}
                </Text>
              </Left>
              <Body style={{ flex: 4 }}>
                <Text note>{order.destination.label}</Text>
              </Body>
            </CardItem>
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Text note style={{ fontWeight: "bold" }}>
                  {IMLocalized("wording-address")}
                </Text>
              </Left>
              <Body style={{ flex: 4 }}>
                <Text note>{order.destination.description}</Text>
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
              // props.navigation.navigate("EDIT_EMERGENCY", {
              //   currentStore: order.partner,
              // });
              alert("Set as Default Order");
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(EditEmergencyOrder);
