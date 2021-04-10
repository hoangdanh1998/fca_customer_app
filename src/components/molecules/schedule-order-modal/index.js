import React, { useState } from "react";
import moment from "moment";
import { Modal, TouchableWithoutFeedback } from "react-native";
import {
  H3,
  Text,
  View,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Radio,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import UnFocusedButton from "../../atoms/unfocused-button/index";
import FocusedButton from "../../atoms/focused-button/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { LANGUAGE } from "../../../constants/index.js";
// import { styles } from "./styles";
import { MESSAGES } from "../../../constants/index";

init(LANGUAGE.VI);
const ScheduleOrderModal = (props) => {
  const [visibleTimePicker, setVisibleTimePicker] = useState(false);
  return (
    <Modal visible={props.visible} transparent>
      <Card
        style={{
          width: "75%",
          height: "50%",
          marginLeft: "12.5%",
          marginTop: "50%",
        }}
      >
        <CardItem header bordered>
          <Text>Lịch đặt hàng tự động</Text>
        </CardItem>
        <CardItem bordered>
          {visibleTimePicker ? (
            <DateTimePicker
              value={moment().toDate()}
              mode="time"
              is24Hour={true}
              display="spinner"
              // onChange={onChange}
            />
          ) : null}
          <TouchableWithoutFeedback
            style={{ backgroundColor: "red" }}
            onPress={() => {
              setVisibleTimePicker(true);
            }}
          >
            <Text>Timer</Text>
          </TouchableWithoutFeedback>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Radio selected={false} />
          </Left>
          <Right style={{ flex: 9 }}>
            <Text style={{ width: "100%" }}>All days</Text>
          </Right>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Radio selected={false} />
          </Left>
          <Right style={{ flex: 9 }}>
            <Text style={{ width: "100%" }}>From Monday To Friday</Text>
          </Right>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Radio selected={false} />
          </Left>
          <Right style={{ flex: 9 }}>
            <Text style={{ width: "100%" }}>Option</Text>
          </Right>
        </CardItem>
        <CardItem footer bordered style={{ flex: 1, justifyContent: "center" }}>
          <Left>
            <UnFocusedButton name="later" onPress={props.onCancel} />
          </Left>
          <Right>
            <FocusedButton name="done" />
          </Right>
        </CardItem>
      </Card>
    </Modal>
  );
};

export default ScheduleOrderModal;
