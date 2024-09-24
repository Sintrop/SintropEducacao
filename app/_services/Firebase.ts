import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAiht5Z673BW0M1EdIMO1mGWSpcsHcItaU",
    authDomain: "sintropeducacao.firebaseapp.com",
    projectId: "sintropeducacao",
    storageBucket: "sintropeducacao.appspot.com",
    messagingSenderId: "613332735146",
    appId: "1:613332735146:web:18b7cc2fab9617ff6aacd3"
};
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
    storage,
}