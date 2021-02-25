import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Content, Footer, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import CancelButton from "../../components/atoms/cancel-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const OrderDetails = (props) => {
  // ================================= GET DATA FROM NAVIGATOR =================================
  const isAfterCreate = props.route.params.isAfterCreate;

  // ================================= HANDLE CALL API =================================
  const order = useSelector((state) => {
    return state.order.createdOrder;
  });
  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
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
            <OrderButton block name={MESSAGES.DIRECTION} disable={false} />
          </View>
        ) : null}
      </Footer>
    </>
  );
};

export default OrderDetails;
