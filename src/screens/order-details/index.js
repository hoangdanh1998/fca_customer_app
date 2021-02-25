import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Content, Footer, View, H3, Card } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import CancelButton from "../../components/atoms/cancel-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import TimelineTransaction from "../../components/atoms/timeline-transaction/index";
import { LANGUAGE, MESSAGES, LIGHT_COLOR } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";
import { withNavigation } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";

const OrderDetails = (props) => {
  // ================================= HANDLE NAVIGATOR =================================
  const isAfterCreate = props.route.params.isAfterCreate;
  const [backEvent, setBackEvent] = useState({});
  const order = useSelector((state) => {
    return state.order.createdOrder;
  });

  useEffect(
    () =>
      props.navigation.addListener("beforeRemove", (e) => {
        console.log(e.data.action);
        // if (e.data.action.type == "GO_BACK") {
        //   props.navigation.navigate("MAP_VIEW");
        // }
        e.preventDefault();
        // props.navigation.navigate("MAP_VIEW");
      }),
    []
  );

  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order.partner} orderDetails={order} />
          <View>
            <H3>{"Timeline"}</H3>
            <Card>
              <TimelineTransaction />
            </Card>
          </View>
        </View>
      </Content>
      <Footer style={{ backgroundColor: null, justifyContent: "space-around" }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <CancelButton
            bordered
            name={MESSAGES.HOME}
            onPress={() => {}}
            disable={false}
          />
          <OrderButton
            block
            name={MESSAGES.DIRECTION}
            onPress={() => {}}
            disable={false}
          />
        </View>
      </Footer>
    </>
  );
};

export default withNavigation(OrderDetails);
