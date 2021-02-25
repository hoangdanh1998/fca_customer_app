import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Content, Footer, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import CancelButton from "../../components/atoms/cancel-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";

import { init } from "../../i18n/IMLocalized";
import { withNavigation } from "@react-navigation/compat";
const OrderDetails = (props) => {
  init(LANGUAGE.VI);
  const isAfterCreate = props.route.params.isAfterCreate;

  const order = useSelector((state) => {
    return state.order.createdOrder;
  });

  const notificationListener = useRef();
  const responseListener = useRef();
  const navigateToNavigationPage = () => {
    console.log('hello navigate')
    props.navigation.navigate("MAP_NAVIGATION", { store: order.partner })
  }
  return (
    <>
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail store={order.partner} orderDetails={order} />
        </View>
      </Content>
      <Footer style={{ backgroundColor: null, justifyContent: "space-around" }}>
        {isAfterCreate ? (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <CancelButton bordered name={MESSAGES.HOME} disable={false} />
            <OrderButton
              block
              name={MESSAGES.DIRECTION}
              disable={false}
              onPress={() => {
                console.log('hello')
                navigateToNavigationPage();
              }}
            />
          </View>
        ) : null}
      </Footer>
    </>
  );
};

export default withNavigation(OrderDetails);
