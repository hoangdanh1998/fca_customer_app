import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/order";
import { Content, Footer, FooterTab, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import { LANGUAGE } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const OrderDetails = (props) => {
  // ================================= GET DATA FROM NAVIGATOR =================================
  //   const order = props.route.params.order;
  //   const store = props.route.params.store;

  // ================================= HANDLE CALL API =================================
  const order = useSelector((state) => {
    // console.log("createdOrder", state.order.createdOrder);
    return state.order.order;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const loadOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(getOrder("ab697c4f-532e-48e6-8ef1-1914ce83bea6"));
    } catch (error) {
      setError(error);
    }
  }, [dispatch, setIsLoading]);
  useEffect(() => {
    loadOrder();
    console.log("order", order);
  }, [dispatch, loadOrder]);

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
      <Footer
        style={{ backgroundColor: "white", justifyContent: "space-around" }}
      >
        <FooterTab style={{ backgroundColor: "white" }}>
          <OrderButton
            block
            name="order"
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
        </FooterTab>
        <FooterTab style={{ backgroundColor: "white" }}>
          <OrderButton
            block
            name="order"
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
        </FooterTab>
        {/* <View style={{ flex: 1 }}>
          <OrderButton
            block
            name="order"
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
          <OrderButton
            block
            name="order"
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
        </View> */}
      </Footer>
    </>
  );
};

export default OrderDetails;
