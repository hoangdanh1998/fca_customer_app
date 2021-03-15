import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import {
  Content,
  List,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Footer,
  View,
  SwipeRow,
  Button,
  // Icon,
} from "native-base";
import { Icon } from "react-native-elements";
import Swipeable from "react-native-swipeable";
import { withNavigation } from "@react-navigation/compat";
import FocusedButton from "../../components/atoms/focused-button/index";
import { getHistory } from "../../redux/actions/order";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  DARK_COLOR,
  LIGHT_COLOR,
  MESSAGES,
  LANGUAGE,
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index";
import { EMERGENCY_LIST } from "../../constants/seeding";

const SavedAddressList = (props) => {
  init(LANGUAGE.VI);
  //   var orderList = props.orderList;
  const customerAccount = useSelector((state) =>
    Object.assign({}, state.account)
  );
  const emergencyList = customerAccount.customer.address;
  console.log("emergencyList", emergencyList);
  const rightButtons = [
    <Button
      onPress={() => {
        alert("Press button");
      }}
      style={{
        backgroundColor: DARK_COLOR,
        flex: 1,
        width: "100%",
      }}
    >
      <Icon
        style={{ flex: 1, justifyContent: "center", paddingLeft: "10%" }}
        size={30}
        name="pencil-outline"
        type="ionicon"
        color="white"
      />
    </Button>,
    <Button
      onPress={() => {
        alert("Press button");
      }}
      style={{
        backgroundColor: "#ff4747",
        flex: 1,
        width: "100%",
      }}
    >
      <Icon
        style={{ flex: 1, justifyContent: "center", paddingLeft: "10%" }}
        size={30}
        name="trash-outline"
        type="ionicon"
        color="white"
      />
    </Button>,
  ];
  return (
    <>
      <Content>
        <List
          dataArray={emergencyList}
          renderRow={(item) => (
            <Swipeable
              rightButtons={rightButtons}
              style={{
                flex: 1,

                height: "95%",
                marginTop: "2.5%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "95%",
                  marginLeft: "2.5%",
                  shadowColor: "grey",
                  shadowOffset: { height: 1, width: 1 },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                }}
              >
                <CardItem style={{ flex: 1, width: "100%" }}>
                  {/* <Left style={{ flex: 1 }}>
                        <Icon
                          name={
                            item.savedAddress.isDefault
                              ? "flag"
                              : "bookmark-outline"
                          }
                          type="ionicon"
                          color={DARK_COLOR}
                          size={15}
                        />
                      </Left> */}
                  <Left style={{ flex: 1 }}>
                    <Icon
                      name="bookmark-outline"
                      type="ionicon"
                      color={DARK_COLOR}
                      size={15}
                    />
                  </Left>
                  <Body
                    style={{
                      flex: 9,
                    }}
                  >
                    <Text
                      note
                      style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        color: DARK_COLOR,
                        fontWeight: "bold",
                      }}
                    >
                      {item.label}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem style={{ flex: 1, width: "100%" }}>
                  <Body style={{ flex: 1 }}>
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      {item.description}
                    </Text>
                  </Body>
                </CardItem>
              </View>
            </Swipeable>
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
              props.navigation.navigate("ADD_ADDRESS");
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(SavedAddressList);
