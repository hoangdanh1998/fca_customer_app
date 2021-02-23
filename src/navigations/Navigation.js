import { HeaderBackButton, createStackNavigator } from '@react-navigation/stack';

import CreateOrder from '../screens/create-order';
import {DARK_COLOR} from '../constants/index'
import MapCustomer from '../screens/map/google-map'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StoreDetails from '../screens/store-details';

const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen 
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
            /> */}
                <Stack.Screen 
                name="CREATE_ORDER" 
                component={MapCustomer} 
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