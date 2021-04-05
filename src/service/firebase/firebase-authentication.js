import * as firebase from "firebase";
import "@firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyD37qFaoB09lhAstwUz6y7QZcEGpEKo3Ak",
//     authDomain: "fca-system.firebaseapp.com",
//     projectId: "fca-system",
//     storageBucket: "fca-system.appspot.com",
//     messagingSenderId: "1072776638228",
//     appId: "1:1072776638228:web:6d60cf4676d61267fd1c01"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAYB22QAFUtlPnYjUOxoliIjNCHDJjvoQ8",
  authDomain: "fast-coffee-2021.firebaseapp.com",
  databaseURL: "https://fast-coffee-2021-default-rtdb.firebaseio.com/",
  projectId: "fast-coffee-2021",
  storageBucket: "fast-coffee-2021.appspot.com",
  messagingSenderId: "319088293595",
  appId: "1:319088293595:android:f060f3945112b44b463efe",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
