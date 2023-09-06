import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "utility-app-6923b.firebaseapp.com",
  projectId: "utility-app-6923b",
  storageBucket: "utility-app-6923b.appspot.com",
  messagingSenderId: "98520948645",
  appId: "1:98520948645:web:567aa55604e3f97f98124c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
