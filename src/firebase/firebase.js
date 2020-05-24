import firebase from 'firebase/app'
import 'firebase/storage';

var firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: "ymir-assignment-277317.firebaseapp.com",
    databaseURL: "https://ymir-assignment-277317.firebaseio.com",
    projectId: "ymir-assignment-277317",
    storageBucket: "ymir-assignment-277317.appspot.com",
    messagingSenderId: "955175867113",
    appId: "1:955175867113:web:449a7eef9fc4d76b005678",
    measurementId: "G-H2LWJM29MM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()


  export  {
    storage, firebase as default
  }