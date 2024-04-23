import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3K048n7FaAlmR3X4b3JbCgPks-tCeDyg",
  authDomain: "to-do-list-b8ef6.firebaseapp.com",
  projectId: "to-do-list-b8ef6",
  storageBucket: "to-do-list-b8ef6.appspot.com",
  messagingSenderId: "912875480053",
  appId: "1:912875480053:web:6d8ac82fff136a9118b6bc"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
export {app,auth};