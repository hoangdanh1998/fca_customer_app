import React, { useState } from "react";
import { Content, Footer, Header, View } from "native-base";
import OrderButton from "../../components/atoms/order-button/index";
import OrderDetail from "../../components/molecules/order-details/index";
import ProcessingModal from "../../components/molecules/processing-modal/index";
import { LANGUAGE } from "../../constants/index";

import { IMLocalized, init } from "../../i18n/IMLocalized";

const CreateOrder = (props) => {
  init(LANGUAGE.VI);
  //   var menuDrink = props.menuDrink;
  const [visibleTimer, setVisibleTimer] = useState(false);
  const [timeout, handleTimeout] = useState();
  const handlePressOrderButton = () => {
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
      <Header />
      <Content>
        <View style={{ width: "95%", marginLeft: "2.5%" }}>
          <OrderDetail />
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
