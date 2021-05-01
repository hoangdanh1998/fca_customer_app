import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Footer,
  Left,
  List,
  Right,
  SwipeRow,
  Text,
  View,
} from "native-base";
import {
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR,
  MESSAGES,
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import React, { useCallback, useEffect } from "react";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import FocusedButton from "../../components/atoms/focused-button/index";
import { Icon } from "react-native-elements";
import Swipeable from "react-native-swipeable";
import { withNavigation } from "@react-navigation/compat";
import { delAddress } from "../../redux/actions/map";

const SavedAddressList = (props) => {
  init(LANGUAGE.VI);
  const dispatch = useDispatch();
  const customerAccount = useSelector((state) =>
    Object.assign({}, state.account)
  );
  const emergencyList =
    customerAccount?.customer?.address?.length > 0
      ? customerAccount.customer.address
      : [];

  const deleteAddress = async (id) => {
    try {
      await dispatch(delAddress(customerAccount?.customer?.account?.id, id));
    } catch (error) {
      alert(error);
    }
  };

  const rightButtons = (item) => [
    <Button
      onPress={() => {
        props.navigation.navigate("ADD_ADDRESS", { addressId: item });
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
        deleteAddress(item.id);
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
              rightButtons={rightButtons(item)}
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
              props.navigation.navigate("ADD_ADDRESS", { addressId: null });
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(SavedAddressList);
