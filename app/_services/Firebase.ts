import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "sintropeducacao.firebaseapp.com",
    projectId: "sintropeducacao",
    storageBucket: "sintropeducacao.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
    storage,
}