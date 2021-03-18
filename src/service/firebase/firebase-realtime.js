import * as firebase from "firebase";
export const setTrackingOrder = (orderId, timeRemain) => {
  firebase.database().ref("order").child(orderId).update({
    id: orderId,
    timeRemain,
  });
  return;
};

export const getOrderOnChange = (orderId, order) => {
  if (orderId) {
    const ref = firebase.database().ref("order");
    ref.child(orderId).on("value", (snapshot) => {
      order(snapshot.val());
    });
  }
};

export const stopListenOrder = async (orderId, listener) => {
  firebase.database().ref("order").child(orderId).off("value", listener());
};
