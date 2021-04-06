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
import { ActivityIndicator } from "react-native";
import NumberFormat from "react-number-format";
import { withNavigation } from "@react-navigation/compat";
import { Divider } from "react-native-elements";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_PROFILE } from "../../constants/seeding";
import {
  LANGUAGE,
  DARK_COLOR,
  MESSAGES,
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index.js";
import { convertEmergencyToNormal } from "../../utils/utils";

const EmergencyProfile = (props) => {
  init(LANGUAGE.VI);
  // const profile = EMERGENCY_PROFILE;
  const loadedProfile = useSelector((state) => state.emergency.emergency);
  const [profile, setProfile] = useState(loadedProfile);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (loadedProfile && loadedProfile?.items) {
      const convertedProfile = convertEmergencyToNormal(loadedProfile);
      console.log("loadedProfile", loadedProfile);
      setProfile(convertedProfile);
    }
    setIsLoading(false);
  }, []);

  // ================================= HANDLE UI =================================

  return !isLoading ? (
    profile && profile?.order ? (
      <>
        <Content style={styles.content}>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <H3 style={styles.title}>{profile?.partner?.name}</H3>
            <Text
              note
              style={{ color: DARK_COLOR, width: "95%", marginLeft: "2.5%" }}
            >
              {profile?.partner?.address?.description}
            </Text>
            <List
              dataArray={profile?.items}
              renderRow={(item) => (
                <>
                  <OrderDetailCard item={item} />
                  <Divider style={{ backgroundColor: DARK_COLOR }} />
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
                  {profile?.items?.reduce((sum, item) => {
                    return (sum += item.quantity);
                  }, 0)}
                  {` ${IMLocalized("wording-item")}`}
                </H3>
              </Body>
              <Right style={{ flex: 3 }}>
                <NumberFormat
                  value={profile?.items?.reduce((sum, item) => {
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
                {IMLocalized("wording-saved-address")}
              </Text>
              {profile?.destination?.label ? (
                <CardItem style={{ flex: 1 }}>
                  <Left style={{ flex: 1 }}>
                    <Text note style={{ fontWeight: "bold" }}>
                      {IMLocalized("wording-saved-address-label")}
                    </Text>
                  </Left>
                  <Body style={{ flex: 4 }}>
                    <Text note>{profile?.destination?.label}</Text>
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
                  <Text note>{profile?.destination?.description}</Text>
                </Body>
              </CardItem>
            </View>
          </View>
        </Content>
        <Footer style={styles.footer}>
          <View style={{ flex: 1 }}>
            <FocusedButton
              block
              name={MESSAGES.ORDER}
              disable={false}
              onPress={() => {
                console.log("press");
                props.navigation.navigate("CREATE_EMERGENCY_ORDER", {
                  emergencyOrder: profile,
                });
              }}
            />
          </View>
        </Footer>
      </>
    ) : (
      <View></View>
    )
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
    </View>
  );
};

export default withNavigation(EmergencyProfile);
