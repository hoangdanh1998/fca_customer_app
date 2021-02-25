import React from "react";
import Timeline from "react-native-timeline-flatlist";
import { TIMELINE } from "../../../constants/seeding";
import { DARK_COLOR, LIGHT_COLOR } from "../../../constants/index";

const TimelineTransaction = (props) => {
  //   const timeline = props.timeline;
  const timeline = TIMELINE;
  return (
    <Timeline
      circleColor={LIGHT_COLOR}
      lineColor={DARK_COLOR}
      data={timeline}
    />
  );
};

export default TimelineTransaction;
