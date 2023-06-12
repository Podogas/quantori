import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseApiKey } from "./env";

const firebaseConfig = {
  apiKey: FirebaseApiKey,
  authDomain: "podogas-final-task.firebaseapp.com",
  projectId: "podogas-final-task",
  storageBucket: "podogas-final-task.appspot.com",
  messagingSenderId: "117078363294",
  appId: "1:117078363294:web:e163a26073614390d5bf8f",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export { auth };
