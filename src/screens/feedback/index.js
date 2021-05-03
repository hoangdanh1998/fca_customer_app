import React, { useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Alert,
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
import { Rating, AirbnbRating } from "react-native-elements";
import NotificationModal from "../../components/atoms/notification-modal/index";
import FocusedButton from "../../components/atoms/focused-button/index";
import { init, IMLocalized } from "../../i18n/IMLocalized";
import { styles } from "./style";
import { DARK_COLOR, LANGUAGE } from "../../constants";
import { makeFeedback } from "../../redux/actions/order";

init(LANGUAGE.VI);
const FeedBackScreen = (props) => {
  const order = props.route.params.order;
  const previousScreen = props.route.params.screenName;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [visibleNotificationModal, setVisibleNotificationModal] = useState(
    false
  );

  const dispatch = useDispatch();
  const handleSendFeedback = async () => {
    try {
      const param = {
        star: rating,
        description: comment,
        orderId: order.id,
      };
      await dispatch(makeFeedback(param));
    } catch (error) {
      alert("Send feedback fail because " + error);
    }
  };
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
                <Rating
                  type="star"
                  ratingCount={5}
                  fractions={1}
                  startingValue={5}
                  imageSize={60}
                  onFinishRating={(value) => {
                    setRating(value);
                  }}
                />
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
              handleSendFeedback();
              setVisibleNotificationModal(true);
              setTimeout(() => {
                setVisibleNotificationModal(false);
                previousScreen
                  ? props.navigation.popToTop()
                  : props.navigation.navigate("MAP_VIEW");
              }, 1000);
            }}
          />
        </View>
      </Footer>
      <NotificationModal
        message={IMLocalized("title-thanks-for-feedback")}
        title={IMLocalized("title-thanks")}
        visible={visibleNotificationModal}
      />
    </KeyboardAvoidingView>
  );
};
export default withNavigation(FeedBackScreen);
