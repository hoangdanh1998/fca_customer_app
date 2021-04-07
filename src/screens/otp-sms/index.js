import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import { styles } from "./style";
import OTPInput from "react-native-otp-textinput";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Animated } from "react-native";
import firebase from "../../service/firebase/firebase-authentication";
import {
    FirebaseRecaptchaVerifierModal,
    FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import {useDispatch} from 'react-redux';
import { registerAccount } from "../../redux/actions/account";

export default function OtpSmsScreen(props) {

    const dispatch = useDispatch();
    // console.log("props of otp:", props);
    const newAccount = props.route.params.newAccount.newAccount;
    const numberPhoneValue = props.route.params.numberPhoneValue;
    const numberPhone = newAccount.numberPhone;
    const password = newAccount.password;

    const [duration, setDuration] = useState(180);
    const [isShowButton, setIsShowButton] = useState(false);
    const [key, setKey] = useState(0);
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState();


    const onComplete = () => {
        setIsShowButton(true);
    };

    const handleTextChange = (text) => {
        if (text.length === 6) {
            confirmCode(text);
        }
    };

    const handleReSendOtp = () => {
        setIsShowButton(false);
        sendVerification();
        setKey((preventKey) => preventKey + 1);
        console.log("hello");
    };

    const sendVerification = () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            
            phoneProvider
                .verifyPhoneNumber(numberPhoneValue, recaptchaVerifier.current)
                .then(setVerificationId)
                .catch(error => console.error(error));
            console.log("send success");
        } catch (error) {
            console.error("err sendVerification: ", error);
        }

    };

    const confirmCode = (code) => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                code
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                    dispatch(registerAccount(
                        { numberPhone, password },
                        newAccount.name));

                    alert('Đăng ký thành công');
                    props.navigation.navigate('LOGIN');
                }).catch(error => {
                    console.error(error);
                    alert('Mã xác thực không chính xác')
                });
        } catch (error) {
            console.error("confirm code err: ", error);
        }
    }

    useEffect(() => {
        sendVerification();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="height"
                enabled
            >
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={firebase.app().options}

                        />
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={[styles.title, { fontWeight: 'bold', fontSize: 25 }]}>Xác nhận mã OTP</Text>
                            </View>
                            <View style={{ marginTop: "2%" }}>
                                <Text style={styles.title}>
                                    Một mã xác nhận gồm 6 số đã được
                                </Text>
                                <Text style={styles.title}> gửi đến số điện thoại
                                    <Text style={{ fontWeight: 'bold' }}> {newAccount.numberPhone}</Text>
                                </Text>

                            </View>
                            <View style={styles.marginContainer}>
                                <View>
                                    <Text style={styles.title}>
                                        Nhập mã để tiếp tục
                                </Text>
                                </View>
                                <OTPInput
                                    inputCount={6}
                                    handleTextChange={text => { handleTextChange(text) }}

                                />
                            </View>

                            
                                <Text style={{ ...styles.title, marginTop: 3 }}>Bạn không nhận được mã ? </Text>
                                <View style={[styles.rowContainer, styles.marginContainer, { justifyContent: "center" }]}>
                                {
                                    isShowButton
                                        ? (<TouchableHighlight
                                            onPress={() => { console.log('click'); handleReSendOtp() }}
                                            style={{ width: 100, height: 50 }}
                                        >
                                            <Text style={[[styles.title, { marginRight: 5, color: "#004777", marginTop: 4 }]]}> Gửi lại</Text>
                                        </TouchableHighlight>)
                                        : <Text style={[[styles.title, { marginRight: 5, marginTop: 4 }]]}> Gửi lại sau</Text>
                                }

                                <CountdownCircleTimer
                                    key={key}
                                    isPlaying
                                    duration={duration}
                                    strokeWidth={0}
                                    size={35}
                                    onComplete={onComplete}
                                    colors={[
                                        ['#004777', 1],

                                    ]}
                                >
                                    {({ remainingTime, animatedColor }) => {

                                        return (

                                            <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
                                                {remainingTime}
                                            </Animated.Text>
                                        )
                                    }}
                                </CountdownCircleTimer>



                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>

    )
}
