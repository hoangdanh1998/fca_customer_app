import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { updateExpoToken } from '../account/account';
import {ID_ACCOUNT} from '../../constants/index'

export const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Ứng dụng cần được cấp quyền thông báo để hoạt động!');
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        try {
            await updateExpoToken(token, ID_ACCOUNT);
        } catch (error) {
            console.error(error);
        }
        
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

};

