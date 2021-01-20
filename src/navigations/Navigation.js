import React from 'react';
import SearchScreen from '../screens/items/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultShowScreen from '../screens/item-detail/index'


const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={SearchScreen} />
                <Stack.Screen name="Result" component={ResultShowScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}