// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDex_gaoZQvRPMeiv_sOs0XcKaMzG-LVnA",
    authDomain: "practice-firebase-auth-fed16.firebaseapp.com",
    projectId: "practice-firebase-auth-fed16",
    storageBucket: "practice-firebase-auth-fed16.appspot.com",
    messagingSenderId: "781669683111",
    appId: "1:781669683111:web:22cfa6fc33a0c705ff3082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;