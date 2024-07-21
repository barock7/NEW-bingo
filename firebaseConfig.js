// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjR42IvRlRf00oarmzCSq5y34R9IF8QG4",
  authDomain: "newbingo-bcdec.firebaseapp.com",
  projectId: "newbingo-bcdec",
  storageBucket: "newbingo-bcdec.appspot.com",
  messagingSenderId: "702994235307",
  appId: "1:702994235307:web:b7b7ab76403dd5321c1cee",
  measurementId: "G-F4W0BQ2BM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);