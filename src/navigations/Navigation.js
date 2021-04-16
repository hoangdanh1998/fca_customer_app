import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Icon, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import {
  APP_NAME,
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR,
} from "../constants/index";
import { IMLocalized, init } from "../i18n/IMLocalized";
import { setDeviceKey } from "../redux/actions/account";
import CreateOrder from "../screens/create-order";
import DeliveryOrder from "../screens/delivery-order";
import EditEmergencyOrder from "../screens/edit-emergency-order";
import EmergencyProfile from "../screens/emergency-profile";
import EmergencyOrderList from "../screens/emergency-order-list";
import HistoryOrder from "../screens/history-order";
import HistoryOrderDetails from "../screens/history-order-details";
import MapScreenEmergency from "../screens/map/emergency-google-map";
import MapScreen from "../screens/map/google-map";
import AddressScreen from "../screens/map/google-map-address";
import googleMapNavigation from "../screens/map/google-map-navigation";
import MyProfile from "../screens/my-profile";
import OrderDetails from "../screens/order-details";
import SavedAddressList from "../screens/saved-address-list";
import StoreDetails from "../screens/store-details";
import StoreDetailsEmergency from "../screens/store-details-emergency";
import { updateExpoToken } from "../service/account/account";
import {
  getDeviceKeyOnChange,
  setDeviceKeyFirebase,
} from "../service/firebase/firebase-realtime";
import { registerForPushNotificationsAsync } from "../service/notification/expo-notification";
import CreateEmergencyOrder from "../screens/create-emergency-order";
import FeedBackScreen from "../screens/feedback";
import FavoriteItemScreen from "../screens/favorite-items";

// import EmergencyMapScreen from '../screens/map/emergency-google-map'
const Stack = createStackNavigator();
init(LANGUAGE.VI);
export default function Navigation(props) {
  const deviceKey = useSelector((state) => state.account.deviceKey);
  const customer = useSelector((state) => state.account.customer);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [listenAccount, setListenAccount] = useState(null);
  const dispatch = useDispatch();

  const handleSetDeviceKey = async () => {
    const deviceKey = await registerForPushNotificationsAsync();
    console.log("device token:", deviceKey);

    updateExpoToken(deviceKey, customer?.account?.id);
    await setDeviceKeyFirebase(customer?.account?.id, deviceKey);

    dispatch(setDeviceKey(deviceKey));
  };

  const handleLogOut = props.route.params.handleLogOut;
  useEffect(() => {
    handleSetDeviceKey();
  }, []);

  useEffect(() => {
    if (listenAccount && deviceKey) {
      if (deviceKey !== listenAccount.deviceKey) {
        Alert.alert(
          IMLocalized("wording-title-notification"),
          IMLocalized("wording-message-force-logout"),
          [{ text: "OK" }]
        );
        handleLogOut();
      }
    }
  }, [listenAccount, deviceKey]);

  useEffect(() => {
    if (customer) {
      getDeviceKeyOnChange(customer?.account?.id, (account) => {
        setListenAccount(account);
      });
    }
  }, []);

  // setDeviceKey(customer?.account?.id, deviceKey);
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="FAVORITE_ITEM"
        component={FavoriteItemScreen}
        options={{
          title: "Món yêu thích",
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
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
        name="CREATE_EMERGENCY_ORDER"
        component={CreateEmergencyOrder}
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
          headerRight: () => (
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
                  navigation.navigate("EMERGENCY_ORDER_LIST");
                }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="EMERGENCY_ORDER_LIST"
        component={EmergencyOrderList}
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
        name="EDIT_EMERGENCY_ORDER"
        component={EditEmergencyOrder}
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
      <Stack.Screen
        name="FEEDBACK"
        component={FeedBackScreen}
        options={{
          title: IMLocalized("title-feedback"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
