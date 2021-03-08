import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import {
  Content,
  List,
  Card,
  CardItem,
  Left,
  Right,
  View,
  Text,
  Icon,
  Footer,
  Body,
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import FocusedButton from "../../components/atoms/focused-button/index";
import { getHistory } from "../../redux/actions/order";
import { DARK_COLOR, MESSAGES, LIGHT_COLOR } from "../../constants/index";
import { EMERGENCY_LIST } from "../../constants/seeding";

const EmergencyProfileList = (props) => {
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
    <MenuProvider>
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
                <CardItem style={{ flex: 3 }}>
                  <Left style={{ flex: 3 }}>
                    <Text note>{item.savedAddress.label}</Text>
                  </Left>
                  <Body style={{ flex: 6 }}>
                    {item.savedAddress.isDefault ? (
                      <Text
                        note
                        style={{
                          color: DARK_COLOR,
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        Default Order
                      </Text>
                    ) : null}
                  </Body>
                  <Right style={{ flex: 1 }}>
                    {/* <Text note>Delete</Text> */}
                    <Menu>
                      <MenuTrigger>
                        <Icon
                          name="arrow-forward"
                          style={{ color: DARK_COLOR }}
                          //   onPress={() => {
                          //     props.navigation.navigate("EMERGENCY_PROFILE");
                          //   }}
                        />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption
                          onSelect={() => alert(`Save`)}
                          text="Save"
                        />
                        <MenuOption onSelect={() => alert(`Delete`)}>
                          <Text style={{ color: "red" }}>Delete</Text>
                        </MenuOption>
                        <MenuOption
                          onSelect={() => alert(`Not called`)}
                          disabled={true}
                          text="Disabled"
                        />
                      </MenuOptions>
                    </Menu>
                  </Right>
                </CardItem>
                <CardItem style={{ flex: 4 }}>
                  <Left style={{ flex: 9 }}>
                    <Text
                      style={{
                        color: DARK_COLOR,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {item.partner.name}
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Icon
                      name="arrow-forward"
                      style={{ color: DARK_COLOR }}
                      onPress={() => {
                        props.navigation.navigate("EMERGENCY_PROFILE");
                      }}
                    />
                  </Right>
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
            name={MESSAGES.EDIT}
            disable={false}
            onPress={() => {
              props.navigation.navigate("EDIT_EMERGENCY", {
                currentStore: profile.partner,
              });
            }}
          />
        </View>
      </Footer>
    </MenuProvider>
  );
};

export default withNavigation(EmergencyProfileList);
