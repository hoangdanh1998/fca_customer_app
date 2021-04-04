import * as firebase from "firebase";
export const setTrackingOrder = (orderId, timeRemain) => {
  firebase.database().ref("order").child(orderId).update({
    id: orderId,
    timeRemain,
  });
};
 
export const updateQRCode = (orderId, qrCode) => {
  firebase.database().ref("order").child(orderId).update({
    id: orderId,
    qrcode: qrCode,
  });
}

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

export const setDeviceKeyFirebase = async (accountId, deviceKey) => {
  if (deviceKey) {
  await firebase.database().ref("account").child(accountId).update({
    id: accountId,
    deviceKey,
  });
  }
};

export const getDeviceKeyOnChange = (accountId, account) => {
  if(accountId) {
    const ref = firebase.database().ref("account");
    ref.child(accountId).on("value", (snapshot) => {
      account(snapshot.val());
    });
  }
};
