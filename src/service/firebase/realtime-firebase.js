import * as firebase from 'firebase';

export const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyAYB22QAFUtlPnYjUOxoliIjNCHDJjvoQ8',
        authDomain: 'fast-coffee-2021.firebaseapp.com',
        databaseURL: 'https://fast-coffee-2021-default-rtdb.firebaseio.com/',
        projectId: 'fast-coffee-2021',
        storageBucket: 'fast-coffee-2021.appspot.com',
        messagingSenderId: '319088293595',
    };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const setTrackingOrder = (orderId, timeRemain, status) => {
    firebase.database().ref(orderId)
        .set({
            id: orderId,
            timeRemain,
            status,
        });
}

export const listenOrderStatus = (orderId, returnValue) => {
    firebase.database().ref(orderId).on('value', (snapshot) => {
        returnValue(snapshot.val().status)
    });
}