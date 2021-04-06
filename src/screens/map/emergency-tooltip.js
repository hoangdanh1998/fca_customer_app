/* eslint-disable react/prop-types */

import React from "react";
import { View, Modal } from "react-native";
import { Card } from "native-base";
import FocusedButton from "../../components/atoms/focused-button/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import { LANGUAGE, MESSAGES, LIGHT_COLOR } from "../../constants/index";
import { init } from "../../i18n/IMLocalized";

const EmergencyTooltip = (props) => {
  init(LANGUAGE.VI);
  return (
    <Modal
      style={{
        height: "25%",
        width: "100%",
        backgroundColor: LIGHT_COLOR,
      }}
    >
      <FocusedButton
        block
        full
        name={MESSAGES.NEXT}
        disable={false}
        // onPress={() =>
        //   // eslint-disable-next-line react/prop-types
        //   props.navigation.navigate("STORE_DETAIL", {
        //     partnerId: store.id,
        //     partner: store,
        //   })
        // }
      />
    </Modal>
  );
};
export default EmergencyTooltip;
