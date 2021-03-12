import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import {
  Content,
  List,
  Card,
  CardItem,
  Left,
  Right,
  View,
  Text,
  Footer,
  Body,
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import FocusedButton from "../../components/atoms/focused-button/index";
import { getHistory } from "../../redux/actions/order";
import { init, IMLocalized } from "../../i18n/IMLocalized";
import {
  DARK_COLOR,
  MESSAGES,
  LIGHT_COLOR,
  LANGUAGE,
} from "../../constants/index";
import { EMERGENCY_LIST } from "../../constants/seeding";

const EmergencyProfileList = (props) => {
  init(LANGUAGE.VI);
  //   var orderList = props.orderList;
  var emergencyList = EMERGENCY_LIST;
  //   const history = useSelector((state) => {
  //     return state.order.history;
  //   });

  //   const dispatch = useDispatch();
  //   const loadHistory = useCallback(async () => {
  //     try {
  //       await dispatch(getHistory("0394422439"));
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }, [dispatch]);
  //   useEffect(() => {
  //     loadHistory();
  //   }, [dispatch, loadHistory]);
  return (
    <>
      <Content style={{ flex: 1 }}>
        <List
          dataArray={emergencyList}
          renderRow={(item) => (
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("EMERGENCY_PROFILE");
              }}
            >
              <Card style={{ flex: 1 }}>
                <CardItem style={{ flex: 1 }}>
                  <Left style={{ flex: 1 }}>
                    <Icon
                      name="location-outline"
                      type="ionicon"
                      color={DARK_COLOR}
                      size={15}
                    />
                  </Left>
                  <Body
                    style={{
                      flex: 7,
                    }}
                  >
                    <Text
                      note
                      style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        color: DARK_COLOR,
                      }}
                    >
                      {item.savedAddress.label}
                    </Text>
                  </Body>
                  <Right style={{ flex: 7 }}>
                    {item.savedAddress.isDefault ? (
                      <Text
                        note
                        style={{
                          flex: 1,
                          color: DARK_COLOR,
                          borderColor: DARK_COLOR,
                          borderWidth: 1,
                          width: "90%",
                          textAlign: "center",
                        }}
                      >
                        {IMLocalized("wording-default-order")}
                      </Text>
                    ) : null}
                  </Right>
                </CardItem>
                <CardItem style={{ flex: 1 }}>
                  <Left style={{ flex: 1 }}>
                    <Icon name="storefront" type="antd" color={DARK_COLOR} />
                  </Left>
                  <Body style={{ flex: 9 }}>
                    <Text
                      style={{
                        flex: 1,
                        fontWeight: "bold",
                        fontSize: 20,
                        color: DARK_COLOR,
                      }}
                    >
                      {item.partner.name}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
      </Content>
      <Footer
        style={{
          height: "auto",
          backgroundColor: "white",
          borderColor: LIGHT_COLOR,
        }}
      >
        <View style={{ flex: 1 }}>
          <FocusedButton
            block
            name={MESSAGES.ADD}
            disable={false}
            onPress={() => {
              props.navigation.navigate("SET_DEFAULT_VIEW")
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(EmergencyProfileList);
