import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/order";
import { Content, Footer, View } from "native-base";
import Geolocation from "react-native-geolocation-service";
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
  const createOrder = useCallback(async () => {
    // setIsLoading(true);
    try {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          console.log("position", { position });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
      await dispatch(createOrder("1ceee651-7dea-4a0f-b517-b49166cb6cfb"));
    } catch (error) {
      setError(error);
    }
  }, [dispatch]);
  // useEffect(() => {
  //   createOrder();
  // }, [dispatch, createOrder]);
  // ================================= HANDLE UI =================================
  init(LANGUAGE.VI);
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [timeout, handleTimeout] = useState();
  const handlePressOrderButton = () => {
    setVisibleTimer(true);

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        // const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        // const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log("position", { position });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
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
