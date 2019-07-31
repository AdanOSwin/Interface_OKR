import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
//import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

require('firebase/firestore');


var firebaseConfig = {
  apiKey: "AIzaSyCJodoDlvCFsnaowP8RsE2-p7rRB6mtL88",
  authDomain: "graficas-6169d.firebaseapp.com",
  databaseURL: "https://graficas-6169d.firebaseio.com",
  projectId: "graficas-6169d",
  storageBucket: "graficas-6169d.appspot.com",
  messagingSenderId: "99160811746",
  appId: "1:99160811746:web:def1f2aae78b8323"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  //const db = firebase.firestore();
  const db = firebase.database();
  //const auth = firebase.auth();



  export {
      db,
     // db2
  }
export default firebase;