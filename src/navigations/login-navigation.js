import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, restoreToken, signOut } from '../redux/actions/account';
import LoadingPage from '../screens/loading-page/index';
import Navigation from './Navigation';



const LoginStack = createStackNavigator();



function LoginNavigation() {

    // const [isLoading, setIsLoading] = useState(true)

    const isLoading = useSelector(state => state.account.isLoading);
    const isSignOut = useSelector(state => state.account.isSignOut);
    const token = useSelector(state => state.account.token);
    const dispatch = useDispatch();

    const handleGetToken = async () => {
        try {

            let token = await AsyncStorage.getItem('@storage_Token');
            let customer = await AsyncStorage.getItem('@storage_Customer');

            if (token !== null) {
                token = JSON.parse(token);
                customer = JSON.parse(customer);
                await dispatch(restoreToken(token, customer));
            } 
            dispatch(finishLoading());
            
        } catch (e) {
            console.error("get token from store: ", e);
        }
        
        
    }

    const handleLogOut = () => {
        dispatch(signOut());
    }

    useEffect(() => {
        handleGetToken();
    }, []);

    return (
        <NavigationContainer>
            <LoginStack.Navigator
                headerMode="none"
            >
                {isLoading ? (<LoginStack.Screen name="LOADING_PAGE" component={LoadingPage} />)
                    : token == null ? <LoginStack.Screen name="LOGIN" 
                    component={Login} 
                    options = {{
                        title:"Sign in",
                        animationTypeForReplace: isSignOut ? 'pop' : 'push'
                    }} /> 
                    : <LoginStack.Screen
                        name="HOME_STACK"
                        component={Navigation} 
                        initialParams={{handleLogOut}}
                    />}

            </LoginStack.Navigator>
        
        </NavigationContainer>
    )

}

export default LoginNavigation;