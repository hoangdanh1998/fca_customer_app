import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { DARK_COLOR } from '../../constants';
import {styles} from './style'

const LoadingPage = () => {
    return (
        <View style = {styles.centered}>
            <ActivityIndicator size="large" color={DARK_COLOR} />
        </View>
    );
}

export default LoadingPage;