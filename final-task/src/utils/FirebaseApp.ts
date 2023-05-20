// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC3NLrUbogbLkJGlKc_SUKWm7eJT7cJyb4",
    authDomain: "podogas-final-task.firebaseapp.com",
    projectId: "podogas-final-task",
    storageBucket: "podogas-final-task.appspot.com",
    messagingSenderId: "117078363294",
    appId: "1:117078363294:web:e163a26073614390d5bf8f"
  };
 
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
