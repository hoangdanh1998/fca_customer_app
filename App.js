import StoreInformation from "./src/components/atoms/store-information/index";
import StoreProfile from "./src/components/molecules/store-profile/index";
import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (this.state.isReady) {
      return <StoreProfile />;
    } else {
      return null;
    }
  }
}
