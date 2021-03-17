import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Icon, View } from "native-base";
import React from "react";
import {
  APP_NAME,
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR,
} from "../constants/index";
import { IMLocalized, init } from "../i18n/IMLocalized";
import CreateOrder from "../screens/create-order";
import DeliveryOrder from "../screens/delivery-order";
import EditEmergencyProfile from "../screens/edit-emergency-profile";
import EmergencyProfile from "../screens/emergency-profile";
import EmergencyProfileList from "../screens/emergency-profile-list";
import HistoryOrder from "../screens/history-order";
import HistoryOrderDetails from "../screens/history-order-details";
import MapScreenEmergency from "../screens/map/emergency-google-map";
import MapScreen from "../screens/map/google-map";
import googleMapNavigation from "../screens/map/google-map-navigation";
import MyProfile from "../screens/my-profile";
import OrderDetails from "../screens/order-details";
import SavedAddressList from "../screens/saved-address-list";
import AddressScreen from "../screens/saved-address-list/google-map-address";
import StoreDetails from "../screens/store-details";
import StoreDetailsEmergency from "../screens/store-details-emergency";

const Stack = createStackNavigator();
export default function Navigation(props) {
  init(LANGUAGE.VI);
  const handleLogOut = props.route.params.handleLogOut;

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MAP_VIEW"
        component={MapScreen}
        options={({ navigation, route }) => ({
          title: APP_NAME,
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: null,

          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "120%",
              }}
            >
              <Icon
                name="cafe-outline"
                style={{ color: LIGHT_COLOR }}
                onPress={() => {
                  navigation.navigate("HISTORY_ORDERS");
                }}
              />
              <Icon
                name="person-circle-outline"
                style={{ color: LIGHT_COLOR }}
                onPress={() => {
                  navigation.navigate("MY_PROFILE");
                }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="SET_DEFAULT_VIEW"
        component={MapScreenEmergency}
        options={({ navigation, route }) => ({
          title: IMLocalized("title-set-default-emergency"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        })}
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
        name="STORE_DETAIL_EMERGENCY"
        component={StoreDetailsEmergency}
        options={{
          title: IMLocalized("wording-set-default"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
      <Stack.Screen
        name="ADD_ADDRESS"
        component={AddressScreen}
        options={{
          title: IMLocalized("wording-add"),
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
      <Stack.Screen
        name="HISTORY_ORDER_DETAILS"
        component={HistoryOrderDetails}
        options={{
          title: IMLocalized("title-history-order"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
      <Stack.Screen
        name="QR_CODE"
        component={DeliveryOrder}
        options={{
          title: IMLocalized("title-qrcode-information"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
        }}
      />
      <Stack.Screen
        name="MAP_NAVIGATION"
        component={googleMapNavigation}
        options={{
          title: IMLocalized("title-navigation-tracking"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
      <Stack.Screen
        name="MY_PROFILE"
        component={MyProfile}
        initialParams={{ handleLogOut }}
        options={{
          title: IMLocalized("title-my-profile"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
      <Stack.Screen
        name="EMERGENCY_PROFILE"
        component={EmergencyProfile}
        options={({ navigation, route }) => ({
          title: IMLocalized("title-emergency-profile"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
          headerRight: (selectedStore) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "120%",
              }}
            >
              <Icon
                name="pencil-outline"
                style={{ color: LIGHT_COLOR }}
                onPress={() => {
                  alert("Edit profile");

                  // navigation.navigate("EDIT_EMERGENCY");
                }}
              />
              <Icon
                name="trash-outline"
                style={{ color: LIGHT_COLOR }}
                onPress={() => {
                  // navigation.navigate("MY_PROFILE");
                  alert("Delete profile");
                }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="EMERGENCY_PROFILE_LIST"
        component={EmergencyProfileList}
        options={({ navigation, route }) => ({
          title: IMLocalized("title-emergency-profile"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        })}
      />
      <Stack.Screen
        name="EDIT_EMERGENCY"
        component={EditEmergencyProfile}
        options={({ navigation, route }) => ({
          title: IMLocalized("title-emergency-profile"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        })}
      />
      <Stack.Screen
        name="SAVED_ADDRESS_LIST"
        component={SavedAddressList}
        options={({ navigation, route }) => ({
          title: IMLocalized("title-saved-address"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        })}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
