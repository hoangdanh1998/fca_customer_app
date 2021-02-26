import * as firebase from 'firebase'
export const setTrackingOrder = (orderId, timeRemain) => {
    firebase.database().ref(orderId)
        .set({
            id: orderId,
            timeRemain: timeRemain,
        });
    return;
}