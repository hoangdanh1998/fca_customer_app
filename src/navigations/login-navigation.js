import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  finishLoading,
  restoreToken,
  setDeviceKey,
  signOut,
} from "../redux/actions/account";
import { restoreOrderCreated } from "../redux/actions/order";
import LoadingPage from "../screens/loading-page/index";
import Login from "../screens/login/index";
import Navigation from "./Navigation";
import * as fcaStorage from "../service/async-storage/async-storage";
import { getEmergency } from "../redux/actions/emergency";

const LoginStack = createStackNavigator();

function LoginNavigation() {
  // const [isLoading, setIsLoading] = useState(true)

  const isLoading = useSelector((state) => state.account.isLoading);
  const isSignOut = useSelector((state) => state.account.isSignOut);
  const token = useSelector((state) => state.account.token);
  const dispatch = useDispatch();

  const handleGetToken = async () => {
    try {
      let token = await AsyncStorage.getItem("@storage_Token");
      let customer = await AsyncStorage.getItem("@storage_Customer");
      if (token !== null) {
        token = JSON.parse(token);
        customer = JSON.parse(customer);
        await dispatch(restoreToken(token, customer));
        await dispatch(getEmergency(customer.id));
      }
      dispatch(finishLoading());
    } catch (e) {
      console.error("get token from store: ", e);
    }
  };
  const handleGetCreatedOrder = async () => {
    try {
      let order = await AsyncStorage.getItem("@storage_Order");
      if (order !== null) {
        order = JSON.parse(order);
        dispatch(restoreOrderCreated(order));
      }
    } catch (e) {}
  };
  // const handleGetEmergency = async () => {
  //   try {
  //     let emergency = await AsyncStorage.getItem("@storage_Emergency");
  //     if (emergency !== null) {
  //       emergency = JSON.parse(emergency);
  //       dispatch(getEmergency(emergency));
  //     }
  //   } catch (e) {}
  // };

  const handleLogOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    fcaStorage.removeOrder();
    handleGetToken();
    handleGetCreatedOrder();
    // handleGetEmergency();
  }, []);

  return (
    <NavigationContainer>
      <LoginStack.Navigator headerMode="none">
        {isLoading ? (
          <LoginStack.Screen name="LOADING_PAGE" component={LoadingPage} />
        ) : token == null ? (
          <LoginStack.Screen
            name="LOGIN"
            component={Login}
            options={{
              title: "Sign in",
              animationTypeForReplace: isSignOut ? "pop" : "push",
            }}
          />
        ) : (
          <LoginStack.Screen
            name="HOME_STACK"
            component={Navigation}
            initialParams={{ handleLogOut }}
          />
        )}
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

export default LoginNavigation;
