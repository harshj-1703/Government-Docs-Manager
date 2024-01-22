import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhpXnxVVfl81k073bPgbJLeSi_oNYq2Zw",
  authDomain: "government-docs-fb805.firebaseapp.com",
  projectId: "government-docs-fb805",
  storageBucket: "government-docs-fb805.appspot.com",
  messagingSenderId: "846010638795",
  appId: "1:846010638795:web:53e6b8b22c46911c4d964e",
  measurementId: "G-DT27JXH5XB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
let auth = getAuth(app);
export {db,auth};