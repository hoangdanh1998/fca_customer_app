import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import StoreDetails from "../screens/store-details";
import CreateOrder from "../screens/create-order";
import { DARK_COLOR, LANGUAGE } from "../constants/index";

import { IMLocalized, init } from "../i18n/IMLocalized";

const Stack = createStackNavigator();
export default function Navigation() {
  init(LANGUAGE.VI);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="STORE_DETAIL"
          component={StoreDetails}
          options={{
            title: IMLocalized("title-store-information"),
            headerTintColor: "#ffff",
            headerStyle: {
              backgroundColor: DARK_COLOR,
            },
            headerLeft: HeaderBackButton,
          }}
        />
        <Stack.Screen
          name="CREATE_ORDER"
          component={CreateOrder}
          options={{
            title: IMLocalized("title-order-information"),
            headerTintColor: "#ffff",
            headerStyle: {
              backgroundColor: DARK_COLOR,
            },
            headerLeft: HeaderBackButton,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
