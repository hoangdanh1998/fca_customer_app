import React, { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE, MESSAGES, LIGHT_COLOR } from "../../../constants/index";

const NotificationModal = (props) => {
  init(LANGUAGE.VI);
  const message = props.message;
  const visible = props.visible;
  const title = props.title;
  return (
    <AwesomeAlert
      show={visible}
      showProgress={false}
      title={title ? IMLocalized(`wording-${title}`) : null}
      message={IMLocalized(`wording-${message}`)}
      onDismiss={props.onDismiss}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      titleStyle={
        message === MESSAGES.DONE ? { color: "green" } : { color: "black" }
      }
      messageStyle={
        message === MESSAGES.DONE ? { color: "green" } : { color: "black" }
      }
      contentStyle={{ backgroundColor: LIGHT_COLOR }}
      contentContainerStyle={{ backgroundColor: LIGHT_COLOR }}
    />
  );
};

export default NotificationModal;
