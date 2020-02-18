import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAKR6vSOTiFBeZL_iJ8bLyPTsMvcoVVhaI",
  authDomain: "catch-of-the-day-tim-blokzyl.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tim-blokzyl.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;