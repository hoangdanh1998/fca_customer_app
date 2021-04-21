import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { DARK_COLOR, LIGHT_COLOR, PRIMARY_LIGHT_COLOR } from "../../constants";
import { checkPhoneExisted } from "../../service/account/account";
import { styles } from "./style";

export default function RegisterAccountScreen(props) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    numberPhone: "",
    password: "",
    confirmPassword: "",
    secureTextEntry: true,
  });
  const [numberErr, setNumberErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [nameErr, setNameErr] = useState(null);

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleChangeName = (name) => {
    setNameErr(null);
    setData({
      ...data,
      name: name,
    });
  };

  const handleChangePhone = (phone) => {
    setNumberErr(null);
    setData({
      ...data,
      numberPhone: phone,
    });
  };

  const handleChangePassword = (password) => {
    setPasswordErr(null);
    setData({
      ...data,
      password: password,
    });
  };

  const handleChangeConfirmPassword = (password) => {
    setConfirmPasswordErr(null);
    setData({
      ...data,
      confirmPassword: password,
    });
  };

  const checkValuePhoneNumber = async (numberPhone) => {
    const phoneReg = /^[0-9]{9,10}$/;
    if (!numberPhone.match(phoneReg)) {
      setNumberErr("Số điện thoại phải có từ 9 đến 10 chữ số");
      return false;
    } else {
      try {
        await checkPhoneExisted(numberPhone);
        setNumberErr("Số điện thoại đã được đăng ký");
        return false;
      } catch (e) {
        return true;
      }
    }
  };

  const checkName = (name) => {
    if (name.length === 0) {
      setNameErr("Họ và tên là bắt buộc");
      return false;
    } else {
      return true;
    }
  };

  const checkPassword = (password) => {
    const passReg = /^(?=.*\d+.*)(?=.*[A-Z]+.*)\w{8,20}$/;

    if (!password.match(passReg)) {
      setPasswordErr(
        "Mật khẩu phải có ít nhất 8 kí tự, phải chứa chữ in hoa, chữ số"
      );
      return false;
    } else {
      return true;
    }
  };

  const checkConfirmPassword = async (confirmPassword) => {
    if (confirmPassword !== data.password) {
      setConfirmPasswordErr("Xác nhận mật khẩu chưa chính xác");
      return false;
    } else {
      return true;
    }
  };

  const handleRegisterAccount = async (
    numberPhone,
    password,
    confirmPassword,
    name
  ) => {
    setNumberErr(null);
    setConfirmPasswordErr(null);
    setNameErr(null);
    setPasswordErr(null);

    const isNumberPhone = await checkValuePhoneNumber(numberPhone);
    const isName = checkName(name);
    const isPassword = checkPassword(password);
    const isConfirmPass = checkConfirmPassword(confirmPassword);

    if (isNumberPhone && isPassword && isName && isConfirmPass) {
      let newAccount = null;
      const chars = numberPhone.split("");
      let phone = "+84";
      let phoneFormat = "";
      if (chars[0] === "0") {
        phone += numberPhone.replace(/^0/, "");
        // phone = "+84" + phone;

        newAccount = {
          numberPhone: data.numberPhone,
          password: data.password,
          name: data.name,
        };
        props.navigation.navigate("OTP_SMS", {
          newAccount: { newAccount },
          numberPhoneValue: phone,
        });
      } else {
        phone = "0" + numberPhone;
        phoneFormat = "+84" + numberPhone;
        newAccount = {
          numberPhone: phone,
          password: data.password,
          name: data.name,
        };
        props.navigation.navigate("OTP_SMS", {
          newAccount: { newAccount },
          numberPhoneValue: phoneFormat,
        });
      }

      // dispatch(registerAccount(newAccount,name));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
      <TouchableWithoutFeedback>
        <ScrollView style={{ backgroundColor: PRIMARY_LIGHT_COLOR }}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../../assets/fca-logo-mobile.png")}
            />

            <View>
              <View style={{ ...styles.inputForm }}>
                <Feather name="user" color={DARK_COLOR} size={25} />

                <TextInput
                  placeholder="Nhập họ và tên"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    styles.titleText,
                    { color: "#05375a", marginRight: 15 },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(val) => handleChangeName(val)}
                />
              </View>
              {nameErr ? (
                <View style={styles.errContainer}>
                  <Text style={[styles.errorMessage]}>{nameErr}</Text>
                </View>
              ) : null}
              <View
                style={{ ...styles.inputForm, marginTop: 20, width: "58%" }}
              >
                <Feather name="phone" color={DARK_COLOR} size={25} />
                <Text style={[styles.titleText, styles.codePhone]}>+84</Text>
                <TextInput
                  placeholder="Số điện thoại"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    styles.titleText,
                    { color: "#05375a", marginRight: 15 },
                  ]}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={(val) => handleChangePhone(val)}
                />
              </View>
              {numberErr ? (
                <View style={styles.errContainer}>
                  <Text style={[styles.errorMessage]}>{numberErr}</Text>
                </View>
              ) : null}
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
              {passwordErr ? (
                <View style={styles.errContainer}>
                  <Text style={[styles.errorMessage]}>{passwordErr}</Text>
                </View>
              ) : null}
              <View style={{ ...styles.inputForm, marginTop: 20 }}>
                <Feather name="lock" color={DARK_COLOR} size={20} />
                <TextInput
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    styles.titleText,
                    { color: "#05375a" },
                  ]}
                  autoCapitalize="none"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  onChangeText={(val) => handleChangeConfirmPassword(val)}
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
            {confirmPasswordErr ? (
              <View style={styles.errContainer}>
                <Text style={[styles.errorMessage]}>{confirmPasswordErr}</Text>
              </View>
            ) : null}
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={{ ...styles.button, marginTop: 15 }}
                underlayColor={LIGHT_COLOR}
                activeOpacity={0.9}
                onPress={() =>
                  handleRegisterAccount(
                    data.numberPhone,
                    data.password,
                    data.confirmPassword,
                    data.name
                  )
                }
              >
                <Text style={[styles.text, styles.textButton, styles.boldText]}>
                  Đăng ký
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
