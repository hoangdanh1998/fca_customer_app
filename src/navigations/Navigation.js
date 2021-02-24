import { DARK_COLOR, LANGUAGE } from "../constants/index";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import { IMLocalized, init } from "../i18n/IMLocalized";

import CreateOrder from "../screens/create-order";
import MapScreen from "../screens/map/google-map";
import { NavigationContainer } from "@react-navigation/native";
import OrderDetails from "../screens/order-details";
import React from "react";
import StoreDetails from "../screens/store-details";
import googleMapNavigation from "../screens/map/google-map-navigation";

const Stack = createStackNavigator();
export default function Navigation() {
  init(LANGUAGE.VI);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen
          name="MAP_NAVIGATION"
          component={googleMapNavigation}
          options={{
            title: "DAWEA",
            headerTintColor: "#ffff",
            headerStyle: {
              backgroundColor: DARK_COLOR,
            }
          }}
        /> */}
      <Stack.Screen
          name="MAP_VIEW"
          component={MapScreen}
          options={{
            title: "FAST COFFEE",
            headerTintColor: "#ffff",
            headerStyle: {
              backgroundColor: DARK_COLOR,
            }
          }}
        />
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
        <Stack.Screen
          name="ORDER_DETAIL"
          component={OrderDetails}
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
