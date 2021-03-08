/* eslint-disable react/prop-types */

import { withNavigation } from "@react-navigation/compat";
import React from "react";
import { View } from "react-native";
import FocusedButton from "../../components/atoms/focused-button/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import { LANGUAGE, MESSAGES } from "../../constants/index";
import { init } from "../../i18n/IMLocalized";

const PopupStore = (props) => {
  init(LANGUAGE.VI);
  const { store } = props;
  return (
    <View
      style={{
        height: "25%",
        width: "100%",
      }}
    >
      <StoreProfileWithAvatar store={store} />
      <FocusedButton
        block
        full
        name={MESSAGES.NEXT}
        disable={false}
        onPress={() =>
          // eslint-disable-next-line react/prop-types
          props.navigation.navigate("STORE_DETAIL", {
            partnerId: store.id,
            partner: store,
          })
        }
      />
    </View>
  );
};
export default withNavigation(PopupStore);
