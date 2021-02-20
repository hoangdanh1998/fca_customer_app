import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { Content, Footer, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import { LANGUAGE } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const CreateOrder = (props) => {
  // ================================= GET DATA FROM NAVIGATOR =================================
  const order = props.route.params.cart;
  const store = props.route.params.store;

  // ================================= HANDLE CALL API =================================
  const dispatch = useDispatch();
  const submitOrder = useCallback(async () => {
    // setIsLoading(true);
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert(
          "Hey! You might want to enable notifications for my app, they are good."
        );
        return;
      }
      var location = await Location.getCurrentPositionAsync({});

      await dispatch(
        createOrder({
          customerId: "76babaeb-3a80-4c35-8695-0305083e88fd",
          partnerId: store.id,
          currentLocation: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          items: Array.from(order.items, (item) => {
            return {
              partnerItemId: item.id,
              quantity: item.quantity,
            };
          }),
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);
  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [timeout, handleTimeout] = useState();
  const handlePressOrderButton = async () => {
    setVisibleTimer(true);
    submitOrder();
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
          <OrderDetail store={store} orderDetails={order} />
        </View>
        {visibleTimer ? (
          <ProcessingModal
            onHide={() => {
              handleHideProcessingModal();
            }}
          />
        ) : null}
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <OrderButton
            block
            name="order"
            disable={false}
            onPress={() => {
              handlePressOrderButton();
            }}
          />
        </View>
      </Footer>
    </>
  );
};

export default CreateOrder;
