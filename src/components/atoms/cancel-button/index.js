import React, { useState } from "react";
import { Text, Button } from "native-base";

import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";
import { styles } from "./styles";
import { MESSAGES } from "../../../constants/index";

const CancelButton = (props) => {
  var name = props.name;
  var disable = props.disable;
  init(LANGUAGE.VI);
  return (
    <Button
      bordered
      {...props}
      light
      disabled={disable}
      style={styles.button}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{IMLocalized(`wording-${name}`)}</Text>
    </Button>
  );
};

export default CancelButton;
