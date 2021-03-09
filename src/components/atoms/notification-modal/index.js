import React, { useState } from "react";
import { Modal, Text } from "react-native";
import { Card, CardItem, Icon } from "native-base";

import { styles } from "./styles";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE, MESSAGES } from "../../../constants/index";

const NotificationModal = (props) => {
  init(LANGUAGE.VI);
  const message = props.message;
  const visible = props.visible;
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <Card style={styles.card}>
        <CardItem style={{ flex: 1 }}>
          <Icon
            name={
              message === MESSAGES.FAIL || message === MESSAGES.REJECTED
                ? "close-circle-outline"
                : "checkmark-circle-outline"
            }
            style={
              message === MESSAGES.FAIL || message === MESSAGES.REJECTED
                ? styles.fail
                : styles.success
            }
          />
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Text style={styles.message}>
            {IMLocalized(`wording-${message}`)}
          </Text>
        </CardItem>
      </Card>
    </Modal>
  );
};

export default NotificationModal;
