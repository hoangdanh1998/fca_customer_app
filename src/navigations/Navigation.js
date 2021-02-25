import {
  DARK_COLOR,
  LANGUAGE,
  APP_NAME,
  LIGHT_COLOR,
} from "../constants/index";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import { View, Icon } from "native-base";
import { IMLocalized, init } from "../i18n/IMLocalized";

import CreateOrder from "../screens/create-order";
import MapScreen from "../screens/map/google-map";
import { NavigationContainer } from "@react-navigation/native";
import OrderDetails from "../screens/order-details";
import React from "react";
import StoreDetails from "../screens/store-details";
import HistoryOrder from "../screens/history-order";

const Stack = createStackNavigator();
export default function Navigation() {
  init(LANGUAGE.VI);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MAP_VIEW"
          component={MapScreen}
          options={{
            title: APP_NAME,
            headerTintColor: LIGHT_COLOR,
            headerStyle: {
              backgroundColor: DARK_COLOR,
            },
            headerLeft: null,
            headerRight: ({ navigate }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "120%",
                }}
              >
                <Icon name="cafe-outline" style={{ color: LIGHT_COLOR }} />
                <Icon
                  name="person-circle-outline"
                  style={{ color: LIGHT_COLOR }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="STORE_DETAIL"
          component={StoreDetails}
          options={{
            title: IMLocalized("title-store-information"),
            headerTintColor: LIGHT_COLOR,
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
            headerTintColor: LIGHT_COLOR,
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
            headerTintColor: LIGHT_COLOR,
            headerStyle: {
              backgroundColor: DARK_COLOR,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="HISTORY_ORDERS"
          component={HistoryOrder}
          options={{
            title: IMLocalized("title-history-order"),
            headerTintColor: LIGHT_COLOR,
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
