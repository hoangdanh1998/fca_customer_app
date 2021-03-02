import * as firebase from "firebase";
export const setTrackingOrder = (orderId, timeRemain) => {
    firebase.database().ref('order').child(orderId)
        .update({
            id: orderId,
            timeRemain,
        });
    return;
}

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
