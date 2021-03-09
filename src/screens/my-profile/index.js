import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { withNavigation } from "@react-navigation/compat";
import { Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native";
import {
  Content,
  Footer,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Text,
  Thumbnail,
  View,
} from "native-base";
import NumberFormat from "react-number-format";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import { init, IMLocalized } from "../../i18n/IMLocalized";
import {
  LANGUAGE,
  MESSAGES,
  LIGHT_COLOR,
  DARK_COLOR,
} from "../../constants/index";
import { MY_PROFILE } from "../../constants/seeding";
/* eslint-disable react/prop-types */

init(LANGUAGE.VI);
const MyProfile = (props) => {
  // const profile = this.props.profile;
  const profile = MY_PROFILE;
  return (
    <>
      <Content style={{ backgroundColor: "white" }}>
        <Card style={{ flex: 1, backgroundColor: LIGHT_COLOR }}>
          <CardItem style={{ backgroundColor: LIGHT_COLOR }}>
            <Left>
              <Thumbnail source={{ uri: profile.imageLink }} />
              <Body>
                <Text
                  style={{
                    fontSize: 30,
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {profile.name}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={{ backgroundColor: LIGHT_COLOR }}>
            <Left>
              <Text style={{ color: DARK_COLOR, fontWeight: "bold" }}>
                {IMLocalized("wording-phone")}
              </Text>
            </Left>
            <Right>
              <Text style={{ color: DARK_COLOR, fontWeight: "bold" }}>
                {profile.phone}
              </Text>
            </Right>
          </CardItem>
          <CardItem style={{ backgroundColor: LIGHT_COLOR }}>
            <Left>
              <Text style={{ color: DARK_COLOR, fontWeight: "bold" }}>
                {IMLocalized("wording-wallet")}
              </Text>
            </Left>
            <Right>
              <NumberFormat
                value={profile.currentAmount}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(formattedValue) => (
                  <Text style={{ color: DARK_COLOR, fontWeight: "bold" }}>
                    {formattedValue} {IMLocalized("currency")}
                  </Text>
                )}
              />
            </Right>
          </CardItem>
        </Card>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("EMERGENCY_PROFILE_LIST");
          }}
        >
          <Card style={{ flex: 1 }}>
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Icon name="flash-outline" type="ionicon" color={DARK_COLOR} />
              </Left>
              <Body style={{ flex: 8 }}>
                <Text
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {IMLocalized("wording-emergency-profile")}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="arrow-forward" color={DARK_COLOR} />
              </Right>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            alert("press");
          }}
        >
          <Card style={{ flex: 1 }}>
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Icon
                  active
                  name="bookmark"
                  type="font-awesome-5"
                  color={DARK_COLOR}
                />
              </Left>
              <Body style={{ flex: 8 }}>
                <Text
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {IMLocalized("wording-saved-address")}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="arrow-forward" color={DARK_COLOR} />
              </Right>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <UnFocusedButton
          bordered
          name={MESSAGES.LOGOUT}
          disable={false}
          onPress={() => {
            props.navigation.navigate("MAP_VIEW");
          }}
        />
      </Footer>
    </>
  );
};

export default withNavigation(MyProfile);
