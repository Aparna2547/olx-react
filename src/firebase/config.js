// import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA4bwO18LPwQdiYZTjV9nTJhQyNgPMi1Mk",
//   authDomain: "olx-clone-8e533.firebaseapp.com",
//   projectId: "olx-clone-8e533",
//   storageBucket: "olx-clone-8e533.appspot.com",
//   messagingSenderId: "910133703291",
//   appId: "1:910133703291:web:6fe022d3ac1a96de10e8de",
//   measurementId: "G-KZM163DCDG",
// };

// const Firebase = initializeApp(firebaseConfig);
// export default Firebase;
// const analytics = getAnalytics(Firebase);
// const auth = getAuth(Firebase);
// export { auth };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4bwO18LPwQdiYZTjV9nTJhQyNgPMi1Mk",
      authDomain: "olx-clone-8e533.firebaseapp.com",
      projectId: "olx-clone-8e533",
      storageBucket: "olx-clone-8e533.appspot.com",
      messagingSenderId: "910133703291",
      appId: "1:910133703291:web:6fe022d3ac1a96de10e8de",
      measurementId: "G-KZM163DCDG",
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);
export const auth = getAuth(Firebase);