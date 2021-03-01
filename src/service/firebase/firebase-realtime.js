import * as firebase from 'firebase';
export const setTrackingOrder = (orderId, timeRemain) => {
    firebase.database().ref(orderId)
        .update({
            id: orderId,
            timeRemain,
        });
    return;
}