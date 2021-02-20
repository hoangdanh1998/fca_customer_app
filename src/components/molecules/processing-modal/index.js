import React, { useState } from "react";
import { Modal, Text, View, Image } from "react-native";
import CancelButton from "../../atoms/cancel-button/index";
import { styles } from "./styles";
import { LANGUAGE, PROCESSING_MODAL_IMAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";

const ProcessingModal = (props) => {
  init(LANGUAGE.VI);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        <Image source={PROCESSING_MODAL_IMAGE} style={styles.image} />
        <Text style={styles.text}>{IMLocalized("wording-processing")}</Text>
        <View style={styles.button}>
          <CancelButton name="cancel-order" onPress={props.onHide} />
        </View>
      </View>
    </Modal>
  );
};

export default ProcessingModal;
