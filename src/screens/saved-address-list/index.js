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
  SwipeRow,
  Button,
  // Icon,
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
  const customerAccount = useSelector((state) =>
    Object.assign({}, state.account)
  );
  const emergencyList = customerAccount.customer.address;
  console.log("emergencyList", emergencyList);
  // var emergencyList = null;

  const profile = useSelector((state) => state.account.customer);

  // const history = useSelector((state) => {
  //   return state.order.history;
  // });

  // const dispatch = useDispatch();
  // const loadHistory = useCallback(async () => {
  //   try {
  //     await dispatch(getHistory("0394422439"));
  //   } catch (error) {
  //     setError(error);
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   loadHistory();
  // }, [dispatch, loadHistory]);
  return (
    <>
      <Content>
        <List
          dataArray={emergencyList}
          renderRow={(item) => (
            <Card
              style={{
                flex: 1,
                width: "95%",
                marginLeft: "2.5%",
                backgroundColor: LIGHT_COLOR,
              }}
            >
              <SwipeRow
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                }}
                leftOpenValue={50}
                rightOpenValue={-50}
                // left={
                //   <TouchableWithoutFeedback
                //     onPress={() => {
                //       alert("set default");
                //     }}
                //   >
                //     <View
                //       style={{
                //         flex: 1,
                //         justifyContent: "center",
                //         backgroundColor: LIGHT_COLOR,
                //       }}
                //     >
                //       <Icon
                //         name="flag-outline"
                //         type="ionicon"
                //         color={DARK_COLOR}
                //       />
                //     </View>
                //   </TouchableWithoutFeedback>
                // }
                body={
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      backgroundColor: LIGHT_COLOR,
                      height: "100%",
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
                }
                right={
                  <TouchableWithoutFeedback
                    onPress={() => {
                      alert("set default");
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: LIGHT_COLOR,
                      }}
                    >
                      <Icon name="trash-outline" type="ionicon" color="red" />
                    </View>
                  </TouchableWithoutFeedback>
                }
              />
            </Card>
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
