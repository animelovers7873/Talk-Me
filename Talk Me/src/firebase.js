import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyALLim--Q4IaNsW04dwzzh0RnZp-Wv49j8",
  authDomain: "techno-chatroom-8abd3.firebaseapp.com",
  databaseURL: "https://techno-chatroom-8abd3-default-rtdb.firebaseio.com",
  projectId: "techno-chatroom-8abd3",
  storageBucket: "techno-chatroom-8abd3.appspot.com",
  messagingSenderId: "859304809059",
  appId: "1:859304809059:web:a6202e796d24bbb1061e56",
  measurementId: "G-LGQN697E0R"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;