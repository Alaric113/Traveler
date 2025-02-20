// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDjzkWeBdFwYmE8MlkJ7tacBgTnvHpcBSU",
    authDomain: "traveltool-42662.firebaseapp.com",
    databaseURL: "https://traveltool-42662-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "traveltool-42662",
    storageBucket: "traveltool-42662.firebasestorage.app",
    messagingSenderId: "977015362593",
    appId: "1:977015362593:web:1363b216e12067eb86bf60",
    measurementId: "G-893F2DNRCY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };