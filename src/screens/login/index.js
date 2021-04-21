import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { styles } from "./style";
import Feather from "react-native-vector-icons/Feather";
import {
  PRIMARY_LIGHT_COLOR,
  DARK_COLOR,
  LIGHT_COLOR,
} from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { changeError, login } from "../../redux/actions/account";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const dispatch = useDispatch();

  const errMessage = useSelector((state) => state.account.errMessage);

  const [data, setData] = useState({
    numberPhone: "",
    password: "",
    secureTextEntry: true,
    error: false,
    isLoading: false,
  });

  // const storeToken = async (token) => {
  //     try {
  //         await AsyncStorage.setItem('@storage_Token', token)
  //     } catch (e) {
  //         console.error("error of store token", e);
  //     }
  // };
  const handleChangePhone = (phone) => {
    setData({
      ...data,
      numberPhone: phone,
    });
  };

  const handleChangePassword = (password) => {
    setData({
      ...data,
      password: password,
    });
  };

  const handleLogin = async (phone, password) => {
    try {
      setData({
        ...data,
        // error: false,
        isLoading: true,
      });
      dispatch(changeError(null));
      if (phone.trim().length == 0 || password.trim().length == 0) {
        await dispatch(changeError("Số điện thoại và mật khẩu là bắt buộc!"));
      } else {
        await dispatch(login(phone, password));
      }
    } catch (error) {
      console.error("handle login err", error);
      dispatch(changeError("Số điện thoại hoặc mật khẩu không hợp lệ"));
    }

    setData({
      ...data,
      isLoading: false,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  if (data.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={DARK_COLOR} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <TouchableWithoutFeedback>
          <ScrollView style={{ backgroundColor: PRIMARY_LIGHT_COLOR }}>
            <View style={styles.container}>
              <Image
                style={styles.logo}
                source={require("../../assets/fca-logo-mobile.png")}
              />
              <View style={styles.form}>
                <View style={{ ...styles.inputForm }}>
                  <Feather name="phone" color={DARK_COLOR} size={25} />
                  <TextInput
                    placeholder="Số điện thoại"
                    placeholderTextColor="#666666"
                    style={[
                      styles.textInput,
                      styles.titleText,
                      { color: "#05375a", marginRight: 15 },
                    ]}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    onChangeText={(val) => handleChangePhone(val)}
                  />
                </View>
                <View style={{ ...styles.inputForm, marginTop: 20 }}>
                  <Feather name="lock" color={DARK_COLOR} size={20} />
                  <TextInput
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#666666"
                    style={[
                      styles.textInput,
                      styles.titleText,
                      { color: "#05375a" },
                    ]}
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => handleChangePassword(val)}
                  />
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Feather name="eye" color="grey" size={20} />
                    ) : (
                      <Feather name="eye-off" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {errMessage != null ? (
                  <Text style={[styles.titleText, styles.errorMessage]}>
                    {errMessage}
                  </Text>
                ) : null}
              </View>
              <View style={styles.buttonBody}>
                <TouchableHighlight
                  style={{ color: "blue" }}
                  underlayColor={LIGHT_COLOR}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.text,
                      styles.textButton,
                      styles.boldText,
                      { color: "#1c8df8", marginTop: 10 },
                    ]}
                  >
                    Quên mật khẩu?
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ color: "blue" }}
                  onPress={() => props.navigation.navigate("REGISTER_ACCOUNT")}
                  underlayColor={LIGHT_COLOR}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.text,
                      styles.textButton,
                      styles.boldText,
                      { color: "#1c8df8", marginTop: 10 },
                    ]}
                  >
                    Đăng ký
                  </Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight
                style={{ ...styles.button, marginTop: 15 }}
                underlayColor={LIGHT_COLOR}
                activeOpacity={0.9}
                onPress={() => handleLogin(data.numberPhone, data.password)}
              >
                <Text style={[styles.text, styles.textButton, styles.boldText]}>
                  Đăng nhập
                </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
