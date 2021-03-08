import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryOrder from "../screens/history-order";

const HeaderStack = createStackNavigator();

function HomeStack() {
  return (
    // <NavigationContainer>
      <HeaderStack.Navigator>
        {/* <HeaderStack.Screen name="HEADER" component={MyHeader} /> */}
        <HeaderStack.Screen name="HISTORY_ORDERS" component={HistoryOrder} />
      </HeaderStack.Navigator>
    // </NavigationContainer>
  );
}

export default HomeStack;
