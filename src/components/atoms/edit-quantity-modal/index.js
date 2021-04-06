import { Card, CardItem, Left, Body, Right, Icon } from "native-base";
import React from "react";
import { Image, Text, View, Modal } from "react-native";
import NumberFormat from "react-number-format";
import { LANGUAGE, LIGHT_COLOR } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { styles } from "./styles";

const EditQuantityModal = (props) => {
  init(LANGUAGE.VI);
  const visible = props.visible;
  const item = props.item;
  return (
    <CardItem style={{ display: visible, backgroundColor: LIGHT_COLOR }}>
      <Left style={{ flex: 2.5 }}></Left>
      <Body style={{ flex: 5 }}>
        <CardItem style={{ display: visible, backgroundColor: LIGHT_COLOR }}>
          <Left style={{ flex: 1 }}>
            <Icon
              style={styles.icon}
              button
              onPress={props.removeItem}
              name="remove-circle-outline"
            />
          </Left>
          <Body style={{ flex: 1 }}>
            <Text style={styles.action1text}>{item?.quantity}</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Icon
              style={styles.icon}
              button
              onPress={props.addItem}
              name="add-circle-outline"
            />
          </Right>
        </CardItem>
      </Body>
      <Right style={{ flex: 2.5 }}></Right>
    </CardItem>
  );
};

export default EditQuantityModal;
