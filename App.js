import CreateOrder from "./src/screens/create-order/index";
import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Navigation from "./src/navigations/Navigation";
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from "react-redux";
import rootReducer from './src/redux/reducers/root-reducer'


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
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
      return (
        <Provider store={store} styles={{flex:1}}>
          <Navigation />
        </Provider>

      );
    } else {
      return null;
    }
  }
}
