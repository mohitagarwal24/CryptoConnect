
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCz--lhpKES3hyBgu3Y9C6rLF1szCP5ow4",
    authDomain: "cryptowallet-7be3b.firebaseapp.com",
    projectId: "cryptowallet-7be3b",
    storageBucket: "cryptowallet-7be3b.firebasestorage.app",
    messagingSenderId: "383931660722",
    appId: "1:383931660722:web:19ed31f78889924a388cab",
    measurementId: "G-THPLWEJHJY"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
