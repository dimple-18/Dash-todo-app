import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "todo-app-2fbb2.firebaseapp.com",
  projectId: "todo-app-2fbb2",
  storageBucket: "todo-app-2fbb2.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "YOUR_APP_ID",
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("YOUR_");

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
