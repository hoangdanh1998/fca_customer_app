import React, { useState } from "react";
import { Text, Button } from "native-base";

import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";
import { styles } from "./styles";
import { MESSAGES } from "../../../constants/index";

const OrderButton = (props) => {
  var name = props.name;
  var disable = props.disable;
  //   var name = MESSAGES.NEXT;
  //   var disable = false;
  init(LANGUAGE.VI);
  return (
    <Button block light disabled={disable} style={styles.button}>
      {/* <Text style={styles.text}>{IMLocalized(`wording-${name}`)}</Text> */}
      <Text style={styles.text}>{name.quantity}</Text>
    </Button>
  );
};

export default OrderButton;
