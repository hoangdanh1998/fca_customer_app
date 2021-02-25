import OrderDetails from "./src/screens/order-details/index";
import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Navigation from "./src/navigations/Navigation";
import TourGuide from "./src/screens/tour-guide/index";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./src/redux/reducers/root-reducer";
import * as firebase from "firebase";
import { registerForPushNotificationsAsync } from "./src/service/notification/expo-notification";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isTour: false,
    };
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ isTour: true });
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

    registerForPushNotificationsAsync();
    initializeFirebase();
  }

  render() {
    if (this.state.isReady) {
      if (this.state.isTour) {
        return (
          <Provider store={store} styles={{ flex: 1 }}>
            <Navigation />
          </Provider>
        );
      } else {
        return <TourGuide onDone={this._onDone} />;
      }
    } else {
      return null;
    }
  }
}

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAYB22QAFUtlPnYjUOxoliIjNCHDJjvoQ8",
    authDomain: "fast-coffee-2021.firebaseapp.com",
    databaseURL: "https://fast-coffee-2021-default-rtdb.firebaseio.com/",
    projectId: "fast-coffee-2021",
    storageBucket: "fast-coffee-2021.appspot.com",
    messagingSenderId: "319088293595",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}
