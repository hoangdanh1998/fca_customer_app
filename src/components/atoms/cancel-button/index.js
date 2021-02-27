import { Button, Text } from "native-base";
import React from "react";
import { LANGUAGE } from "../../../constants/index.js";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { styles } from "./styles";

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
