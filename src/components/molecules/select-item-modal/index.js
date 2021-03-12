import React, { useState } from "react";
import { Modal, Text } from "react-native";
import { Card, CardItem, List, View, Left, Right } from "native-base";
import DrinkCard from "../../atoms/drink-card/index";
import FocusedButton from "../../atoms/focused-button/index";
import UnFocusedButton from "../../atoms/unfocused-button/index";

// import { styles } from "./styles";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE, MESSAGES, DARK_COLOR } from "../../../constants/index";

const SelectItemModal = (props) => {
  init(LANGUAGE.VI);
  const partner = props.partner;
  const visible = props.visible;
  const cart = props.cart;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={props.hideModal}
    >
      <View
        style={{
          width: "97%",
          height: "90%",
          marginLeft: "1.5%",
          marginTop: "50%",
          marginBottom: "50%",
          flex: 1,
        }}
      >
        <Card style={{ flex: 1 }}>
          <CardItem style={{ flex: 1 }} header>
            <Text
              style={{
                color: DARK_COLOR,
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
                width: "100%",
              }}
            >
              {partner.name}
            </Text>
          </CardItem>
          <CardItem
            style={{
              flex: 8,
              paddingLeft: "-2%",
              paddingRight: "-2%",
            }}
          >
            <List
              style={{ flex: 1 }}
              dataArray={partner.convertedItems}
              renderRow={(item) => (
                <DrinkCard
                  addItem={() => {
                    props.updateCart(item, 1);
                  }}
                  removeItem={() => {
                    props.updateCart(item, -1);
                  }}
                  drink={item}
                  cart={cart.quantity}
                />
              )}
            />
          </CardItem>
          <CardItem style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Left style={{ flex: 1 }}>
                <UnFocusedButton
                  block
                  style={{ width: "100%" }}
                  name={MESSAGES.CLOSE}
                  onPress={props.hideModal}
                />
              </Left>
              <Right style={{ flex: 1 }}>
                <FocusedButton
                  block
                  name={MESSAGES.SAVE}
                  disable={cart.quantity <= 0}
                  onPress={() => {
                    props.saveProfile(cart);
                  }}
                />
              </Right>
            </View>
          </CardItem>
        </Card>
      </View>
    </Modal>
  );
};

export default SelectItemModal;
