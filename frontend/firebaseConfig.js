// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHJHNF8f3ujZ5FTt5PMAP5Fb3waxzcuL0",
  authDomain: "nz-essentials.firebaseapp.com",
  projectId: "nz-essentials",
  storageBucket: "nz-essentials.appspot.com",
  messagingSenderId: "1027737702337",
  appId: "1:1027737702337:web:a4f0ed11082e90666c2940",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

// Export db and storage
export { app, db, storage };
