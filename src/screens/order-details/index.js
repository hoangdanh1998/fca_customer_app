import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/order";
import { Content, Footer, FooterTab, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import CancelButton from "../../components/atoms/cancel-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const OrderDetails = (props) => {
  // ================================= GET DATA FROM NAVIGATOR =================================
  const order = props.route.params.order;
  const isAfterCreate = props.route.params.isAfterCreate;

  // ================================= HANDLE CALL API =================================

  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
  const [timeout, handleTimeout] = useState();
  const handlePressOrderButton = async () => {
    setVisibleTimer(true);
    handleTimeout(
      setTimeout(() => {
        setVisibleTimer(false);
      }, 15000)
    );
  };

  const handleHideProcessingModal = () => {
    clearTimeout(timeout);
    setVisibleTimer(false);
  };

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
            <CancelButton
              bordered
              name={MESSAGES.HOME}
              disable={false}
              onPress={() => {
                handlePressOrderButton();
              }}
            />
            <OrderButton
              block
              name={MESSAGES.DIRECTION}
              disable={false}
              onPress={() => {
                handlePressOrderButton();
              }}
            />
          </View>
        ) : null}
      </Footer>
    </>
  );
};

export default OrderDetails;
