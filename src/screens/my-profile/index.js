import { withNavigation } from "@react-navigation/compat";
import {
  Body,
  Card,
  CardItem,
  Content,
  Footer,
  Left,
  Right,
  Text,
} from "native-base";
import React, { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import UnFocusedButton from "../../components/atoms/unfocused-button/index";
import {
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR,
  MESSAGES,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { getCustomer, getFavoriteItem } from "../../redux/actions/account";
import { getEmergency } from "../../redux/actions/emergency";
/* eslint-disable react/prop-types */

init(LANGUAGE.VI);
const MyProfile = (props) => {
  const handleLogOut = props.route.params.handleLogOut;

  const profile = useSelector((state) => state.account.customer);
  const emergency = useSelector((state) => state.emergency.emergency);
  const favoriteFcaItems = useSelector(
    (state) => state.account.favoriteFcaItems
  );
  console.log("favoriteFcaItems", favoriteFcaItems);

  const dispatch = useDispatch();
  const handleRefreshCustomer = () => {
    try {
      dispatch(getCustomer(profile?.id));
    } catch (error) {
      alert("Get profile fail because " + error);
    }
  };

  const handleRefreshEmergency = async () => {
    try {
      await dispatch(getEmergency(profile?.id));
    } catch (error) {
      alert("Get emergency profile fail because " + error);
    }
  };

  useEffect(() => {
    try {
      dispatch(getFavoriteItem(profile?.id));
    } catch (error) {
      alert("Get favorite item fail because " + error);
    }
  }, [dispatch]);

  return (
    <>
      <Content style={{ backgroundColor: "white" }}>
        <TouchableWithoutFeedback
          onPress={async () => {
            handleRefreshCustomer();
            await handleRefreshEmergency();
          }}
        >
          <Card style={{ flex: 1, backgroundColor: LIGHT_COLOR }}>
            <CardItem style={{ backgroundColor: LIGHT_COLOR }}>
              <Left>
                <Text
                  style={{
                    fontSize: 30,
                    color: DARK_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  {profile?.name}
                </Text>
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
                  {profile?.account.phone}
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
                  value={
                    profile?.account?.balance ? profile.account.balance : 0
                  }
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
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={async () => {
            await handleRefreshEmergency();
            props.navigation.navigate("EMERGENCY_PROFILE");
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
            props.navigation.navigate("SAVED_ADDRESS_LIST");
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
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("FAVORITE_ITEM", {
              favoriteFcaItems: favoriteFcaItems,
            });
          }}
        >
          <Card style={{ flex: 1 }}>
            <CardItem style={{ flex: 1 }}>
              <Left style={{ flex: 1 }}>
                <Icon
                  active
                  name="heart"
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
                  {IMLocalized("wording-favorite-item")}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="arrow-forward" color={DARK_COLOR} />
              </Right>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
        <CardItem
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Text note>Fast Coffee Application</Text>
          <Text note style={{ fontWeight: "bold" }}>
            Hotline: 0364133838
          </Text>
        </CardItem>
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <UnFocusedButton
          bordered
          name={MESSAGES.LOGOUT}
          disable={false}
          onPress={() => {
            handleLogOut();
          }}
        />
      </Footer>
    </>
  );
};

export default withNavigation(MyProfile);
