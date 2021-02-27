import React, { useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import CancelButton from "../../atoms/cancel-button/index";
import { styles } from "./styles";
import { LANGUAGE, PROCESSING_MODAL_IMAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";

import { Toast } from "native-base";
const ProcessingModal = (props) => {
  init(LANGUAGE.VI);
  const { visible, onCancel } = props;

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.container}>
        <Image source={PROCESSING_MODAL_IMAGE} style={styles.image} />
        <Text style={styles.text}>{IMLocalized("wording-processing")}</Text>
        <View style={styles.button}>
          <CancelButton name="cancel-order" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

export default ProcessingModal;
