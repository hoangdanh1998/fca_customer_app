import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import StoreDetails from '../screens/store-details';
import CreateOrder from '../screens/create-order';
import {DARK_COLOR} from '../constants/index'


const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="STORE_DETAIL" 
                component={StoreDetails} 
                options={{
                    title: "Chi tiết cửa hàng",
                    headerTintColor: "#ffff",
                    headerStyle: {
                        backgroundColor: DARK_COLOR,
                    },
                    headerLeft: HeaderBackButton, 
                }
                }
            />
                <Stack.Screen 
                name="CREATE_ORDER" 
                component={CreateOrder} 
                options={{
                    title: "Chi tiết đơn hàng",
                    headerTintColor: "#ffff",
                    headerStyle: {
                        backgroundColor: DARK_COLOR,
                    },
                    headerLeft: HeaderBackButton, 
                }
                }
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}