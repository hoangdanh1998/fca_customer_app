import React, { useState } from "react";
import { Image } from "react-native";

import { IMLocalized, init } from "../../i18n/IMLocalized";
import Onboarding from "react-native-onboarding-swiper";

const TourGuide = (props) => {
  // init(LANGUAGE.VI);
  return (
    <Onboarding
      onDone={props.onDone}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/mapscreen.jpg")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image source={require("../../assets/preparetakeawaycoffee.gif")} />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image source={require("../../assets/preparetakeawaycoffee.gif")} />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

export default TourGuide;
