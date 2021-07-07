import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB_uCbB6SG9Yc_QKDQ6st8uBr4I2Kh6xjw",
    authDomain: "udmidia-56f2a.firebaseapp.com",
    projectId: "udmidia-56f2a",
    storageBucket: "udmidia-56f2a.appspot.com",
    messagingSenderId: "261657263284",
    appId: "1:261657263284:web:454b6271bff01f345b6be1"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.database();
let storage = firebase.storage();
let auth = firebase.auth();


export { db, storage, auth }