import * as firebase from "firebase";
export const setTrackingOrder = (orderId, timeRemain) => {
  firebase.database().ref(orderId).set({
    id: orderId,
    timeRemain: timeRemain,
  });
  return;
};

export const getOrderOnChange = (orderId, order) => {
  if (orderId) {
    firebase
      .database()
      .ref(orderId)
      .on("value", (snapshot) => {
        order(snapshot.val());
      });
  }
};
