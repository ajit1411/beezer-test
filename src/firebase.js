const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyCi0NCjiw2NEQ91ouaGkp-7x2x_u2j3YI8",
    authDomain: "ajit-beezer-30060.firebaseapp.com",
    databaseURL: "https://ajit-beezer-30060.firebaseio.com",
    projectId: "ajit-beezer-30060",
    storageBucket: "ajit-beezer-30060.appspot.com",
    messagingSenderId: "458619662152",
    appId: "1:458619662152:web:f6f09aabe9022fd7a1cd7d",
    measurementId: "G-C60R641ZJJ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp