import React, { useState } from "react";
import { Text, Button } from "native-base";

import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";
import { styles } from "./styles";
import { MESSAGES } from "../../../constants/index";

const OrderButton = (props) => {
  var name = props.name;
  var disable = props.disable;
  const { onPress } = props;
  init(LANGUAGE.VI);
  return (
    <Button
      {...props}
      light
      disabled={disable}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{IMLocalized(`wording-${name}`)}</Text>
    </Button>
  );
};

export default OrderButton;
