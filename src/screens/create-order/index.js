import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { Content, Footer, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import { LANGUAGE, WAITING_DURATION, MESSAGES } from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { withNavigation } from "@react-navigation/compat";

const CreateOrder = (props) => {
  // ================================= GET DATA FROM NAVIGATOR =================================
  const order = props.route.params.cart;
  const store = props.route.params.store;

  // ================================= HANDLE CALL API =================================
  var createdOrder = useSelector((state) => {
    return state.order.createdOrder;
  });
  const dispatch = useDispatch();
  const submitOrder = useCallback(async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert(IMLocalized("wording-error-location"));
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
      handleHideProcessingModal();
      alert("Submit order fail");
    }
  }, [dispatch]);
  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [timeout, handleTimeout] = useState();
  const handlePressOrderButton = async () => {
    submitOrder();
    setVisibleTimer(true);
    handleTimeout(
      setTimeout(() => {
        setVisibleTimer(false);
        props.navigation.navigate("ORDER_DETAIL", {
          order: createdOrder,
          isAfterCreate: true,
        });
      }, WAITING_DURATION)
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
            name={MESSAGES.ORDER}
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

export default withNavigation(CreateOrder);
