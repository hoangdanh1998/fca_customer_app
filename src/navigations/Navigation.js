import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/map/google-map';


const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="HOME" component={MapScreen} />               
            </Stack.Navigator>
        </NavigationContainer>
    );
}