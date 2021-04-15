import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Button,
  Footer,
  Textarea,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  List,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import FocusedButton from "../../components/atoms/focused-button/index";
import { init, IMLocalized } from "../../i18n/IMLocalized";
import { styles } from "./style";
import { DARK_COLOR, LANGUAGE } from "../../constants";

init(LANGUAGE.VI);
export default function FeedBackScreen(props) {
  const [colorIconDislike, setColorIconDislike] = useState("grey");
  const [colorIconLike, setColorIconLike] = useState("grey");
  const order = props.route.params.order;
  const [comment, setComment] = useState("");
  const [react, setReact] = useState("");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
      <TouchableWithoutFeedback>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.message}>
                {IMLocalized("wording-message-feedback-order")}
              </Text>
              <Card style={styles.infoOrder}>
                <CardItem>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      color: DARK_COLOR,
                    }}
                  >
                    {order?.partner?.name}
                  </Text>
                </CardItem>
                <List
                  dataArray={order?.items}
                  renderRow={(item) => (
                    <CardItem>
                      <Text style={styles.drinkItem}>{item.name}</Text>
                    </CardItem>
                  )}
                />
              </Card>
              <View style={[styles.rowContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    setColorIconDislike("red");
                    setColorIconLike("#e0e0e0");
                    setReact("dislike");
                  }}
                >
                  <AntDesign
                    size={70}
                    name="dislike2"
                    color={colorIconDislike}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setColorIconLike("green");
                    setColorIconDislike("#e0e0e0");
                    setReact("like");
                  }}
                >
                  <AntDesign size={70} name="like2" color={colorIconLike} />
                </TouchableOpacity>
              </View>
              <View style={[styles.inputContainer]}>
                <Textarea
                  multiple={true}
                  style={styles.feedbackInput}
                  textAlignVertical="top"
                  numberOfLines={5}
                  placeholder={IMLocalized(
                    "wording-message-give-feedback-comment"
                  )}
                  autoCompleteType="off"
                  autoCorrect={false}
                  onChangeText={(text) => {
                    setComment(text);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Footer style={{ backgroundColor: "white" }}>
        <View style={{ width: "100%" }}>
          <FocusedButton
            full
            name="send"
            onPress={() => {
              alert(JSON.stringify({ react: react, comment: comment }));
            }}
          />
        </View>
      </Footer>
    </KeyboardAvoidingView>
  );
}
