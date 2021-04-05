import { Card, CardItem, Left, Body, Right, Icon } from "native-base";
import React from "react";
import { Image, Text, View, Modal } from "react-native";
import NumberFormat from "react-number-format";
import { LANGUAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { styles } from "./styles";

const EditQuantityModal = (props) => {
  init(LANGUAGE.VI);
  const visible = props.visible;
  return (
    // <Modal visible={visible} style={{ width: "50%" }}>
    //   <CardItem>
    //     <Left>
    //       <Icon
    //         style={styles.icon}
    //         button
    //         //   onPress={props.removeItem}
    //         name="remove-circle-outline"
    //       />
    //     </Left>
    //     <Body>
    //       <Text style={styles.action1text}>{0}</Text>
    //     </Body>
    //     <Right>
    //       <Icon
    //         style={styles.icon}
    //         button
    //         //   onPress={props.addItem}
    //         name="add-circle-outline"
    //       />
    //     </Right>
    //   </CardItem>
    // </Modal>
    <CardItem style={{ display: visible }}>
      <Left>
        <Icon
          style={styles.icon}
          button
          //   onPress={props.removeItem}
          name="remove-circle-outline"
        />
      </Left>
      <Body>
        <Text style={styles.action1text}>{0}</Text>
      </Body>
      <Right>
        <Icon
          style={styles.icon}
          button
          //   onPress={props.addItem}
          name="add-circle-outline"
        />
      </Right>
    </CardItem>
  );
};

export default EditQuantityModal;
