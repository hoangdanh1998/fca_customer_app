
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DARK_COLOR, LIGHT_COLOR } from '../../constants';
import Login from '../../screens/login';
import OtpSmsScreen from '../../screens/otp-sms';
import RegisterAccountScreen from '../../screens/register-account';


const LoginStack = createStackNavigator();


function LoginStackScreen(props) {
    console.log("props of login stack ", props.route);
    // const handleLogOut = props.route.params.handleLogOut;
    return (

        <LoginStack.Navigator
            screenOptions={{ headerShow: false }}
        >

            <LoginStack.Screen name="LOGIN" component={Login} options={{ headerShown: false }} />
            <LoginStack.Screen name="REGISTER_ACCOUNT"
                options={{
                    title: "Đăng ký tài khoản",
                    headerTintColor: LIGHT_COLOR,
                    headerStyle: {
                        backgroundColor: DARK_COLOR,
                    },
                }}
                component={RegisterAccountScreen} />
            <LoginStack.Screen name="OTP_SMS"
                component={OtpSmsScreen}
                options={{ 
                    title: "",
                    headerTintColor: LIGHT_COLOR,
                    headerStyle: {
                        backgroundColor: DARK_COLOR,
                    },
                }}
                
            />
        </LoginStack.Navigator>

    );
};

export default LoginStackScreen;