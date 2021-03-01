import * as firebase from 'firebase';
export const setTrackingOrder = (orderId, status, timeRemain) => {
    firebase.database().ref(orderId)
        .set({
            id: orderId,
            timeRemain,
        });
    return;
}