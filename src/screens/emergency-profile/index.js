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
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_PROFILE } from "../../constants/seeding";
import { LANGUAGE, DARK_COLOR, MESSAGES } from "../../constants/index.js";

import { getPartnerInformation } from "../../redux/actions/partner";

const EmergencyProfile = (props) => {
  init(LANGUAGE.VI);
  const profile = EMERGENCY_PROFILE;

  // ================================= HANDLE UI =================================

  return (
    <>
      <Content style={styles.content}>
        <View style={{ flex: 1, width: "95%", marginLeft: "2.5%" }}>
          <View style={styles.address}>
            <H3 style={styles.title}>
              {IMLocalized("wording-saved-address-label")}
            </H3>
            <View style={styles.cardContent}>
              <Card style={{ flex: 1 }}>
                <CardItem style={{ flex: 1, paddingLeft: "-5%" }}>
                  <Left>
                    <Body>
                      <Text>{IMLocalized("wording-saved-address-label")}</Text>
                      <Text>{profile.partner.address.description}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </View>
          </View>
          <View style={styles.store}>
            <H3 style={styles.title}>
              {IMLocalized("wording-order-information")}
            </H3>
            <Card style={styles.cardContent}>
              <StoreProfileWithAvatar store={profile.partner} />
              <List
                dataArray={profile.selectedItem}
                renderRow={(item) => <OrderDetailCard item={item} />}
              />
            </Card>
          </View>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <View style={{ flex: 1 }}>
          <FocusedButton
            block
            name={MESSAGES.EDIT}
            disable={false}
            onPress={() => {
              props.navigation.navigate("EMERGENCY_STORE", {
                currentStore: profile.partner,
              });
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(EmergencyProfile);
