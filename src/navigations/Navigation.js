import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { Icon, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  APP_NAME,
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR
} from "../constants/index";
import { IMLocalized, init } from "../i18n/IMLocalized";
import { setDeviceKey } from "../redux/actions/account";
import CreateOrder from "../screens/create-order";
import DeliveryOrder from "../screens/delivery-order";
import EditEmergencyProfile from "../screens/edit-emergency-profile";
import EmergencyProfile from "../screens/emergency-profile";
import EmergencyProfileList from "../screens/emergency-profile-list";
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
import { getDeviceKeyOnChange, setDeviceKeyFirebase } from "../service/firebase/firebase-realtime";
import { registerForPushNotificationsAsync } from "../service/notification/expo-notification";

// import EmergencyMapScreen from '../screens/map/emergency-google-map'
const Stack = createStackNavigator();
export default function Navigation(props) {

  const deviceKey = useSelector(state => state.account.deviceKey);
  const customer = useSelector(state => state.account.customer);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [listenAccount, setListenAccount] = useState(null);
  const dispatch = useDispatch();
  
  const handleSetDeviceKey = async () => {
    const deviceKey = await registerForPushNotificationsAsync();
    console.log("device token:", deviceKey);

    updateExpoToken(deviceKey, customer.account.id);
    await setDeviceKeyFirebase(customer.account.id, deviceKey);

    dispatch(setDeviceKey(deviceKey));
  }

  init(LANGUAGE.VI);
  const handleLogOut = props.route.params.handleLogOut;
  useEffect(() => {
    handleSetDeviceKey();
  }, [])

  useEffect(() => {
    if (listenAccount && deviceKey) {
      if (deviceKey !== listenAccount.deviceKey) {
        alert('Tài khoản được đăng nhập từ thiết bị khác')
        handleLogOut();
      }
    }
  }, [listenAccount, deviceKey])

  useEffect(() => {
    if (customer) {
      getDeviceKeyOnChange(customer.account.id, (account) => {
        setListenAccount(account);
      })
    }
  }, [])




  // setDeviceKey(customer?.account?.id, deviceKey);
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
      {/* <Stack.Screen
        name="EMERGENCY_MAP"
        component={EmergencyMapScreen}
        options={{
          title: IMLocalized("wording-set-default"),
          headerTintColor: LIGHT_COLOR,
          headerStyle: {
            backgroundColor: DARK_COLOR,
          },
          headerLeft: HeaderBackButton,
        }}
      /> */}
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


