import React, { useEffect } from "react";
import Timeline from "react-native-timeline-flatlist";
import moment from "moment";
import { Card, CardItem, Left, Right, Text, View } from "native-base";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { TIMELINE } from "../../../constants/seeding";
import {
  DARK_COLOR,
  DATE_TIME_FORMAT_CALL_API,
  LANGUAGE,
  LIGHT_COLOR,
  TIME_FORMAT,
} from "../../../constants/index";

const TimelineTransaction = (props) => {
  init(LANGUAGE.VI);
  //   const timeline = props.timeline;
  const timeline = TIMELINE;
  const date = props.date;
  const transactions = props.transactions;
  return (
    <View style={{ flex: 1 }}>
      <Card style={{ width: "95%", marginLeft: "2.5%" }}>
        <CardItem style={{ width: "100%" }}>
          <Left style={{ width: "100%" }}>
            <Text style={{ textAlign: "left", width: "100%" }}>
              {IMLocalized("wording-timeline")}
            </Text>
          </Left>
          <Right>
            <Text note>{date}</Text>
          </Right>
        </CardItem>
        <CardItem style={{ width: "100%" }}>
          <Timeline
            circleColor={DARK_COLOR}
            lineColor={DARK_COLOR}
            // data={timeline}
            data={transactions}
          />
        </CardItem>
      </Card>
    </View>
  );
};

export default TimelineTransaction;
