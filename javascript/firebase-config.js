// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPA0BBKerm2g4CcR6DxHlK0ZwYdqFgHAU",
    authDomain: "clinic-management-3a41a.firebaseapp.com",
    projectId: "clinic-management-3a41a",
    storageBucket: "clinic-management-3a41a.firebasestorage.app",
    messagingSenderId: "747535412491",
    appId: "1:747535412491:web:8c4aeccdc0036e2d35460e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);