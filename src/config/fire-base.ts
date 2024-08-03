// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB3vQ6JkfxYNNew8W2cGYVCBUFCm1Pc304",
  authDomain: "instagram-project-111ab.firebaseapp.com",
  projectId: "instagram-project-111ab",
  storageBucket: "instagram-project-111ab.appspot.com",
  messagingSenderId: "867542773402",
  appId: "1:867542773402:web:eee8920d1378d01e82b923",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
