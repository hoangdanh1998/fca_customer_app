import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
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
} from "native-base";
import { Icon } from "react-native-elements";
import { withNavigation } from "@react-navigation/compat";
import FocusedButton from "../../components/atoms/focused-button/index";
import { getHistory } from "../../redux/actions/order";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  DARK_COLOR,
  LIGHT_COLOR,
  MESSAGES,
  LANGUAGE,
} from "../../constants/index";
import { EMERGENCY_LIST } from "../../constants/seeding";

const SavedAddressList = (props) => {
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
      <Content>
        <List
          dataArray={emergencyList}
          renderRow={(item) => (
            <TouchableWithoutFeedback
              onPress={() => {
                alert("Handle set as default");
              }}
            >
              <Card style={{ flex: 1 }}>
                <CardItem style={{ flex: 1 }}>
                  <Left style={{ flex: 1 }}>
                    <Icon
                      name="pricetag-outline"
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
                        {IMLocalized("wording-default-address")}
                      </Text>
                    ) : null}
                  </Right>
                </CardItem>
                <CardItem style={{ flex: 1 }}>
                  <Body style={{ flex: 1 }}>
                    <Text
                      style={{
                        flex: 1,
                        color: DARK_COLOR,
                      }}
                    >
                      {item.savedAddress.address.description}
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
              // props.navigation.navigate("EDIT_EMERGENCY", {
              //   currentStore: profile.partner,
              // });
              alert("Add new address");
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(SavedAddressList);
