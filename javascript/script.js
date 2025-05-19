// Import the functions from the SDKs 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, setDoc, getDoc, } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

//Import all functions from firebase-config.js
import { auth, db } from "./firebase-config.js";

// DOM Elements
const loginSection = document.getElementById('loginSection');
const registrationSection = document.getElementById('registrationSection');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerRole = document.getElementById('registerRole');
const registerButton = document.getElementById('registerButton');
const registerError = document.getElementById('registerError');
const switchToRegisterButton = document.getElementById('switchToRegisterButton');
const switchToLoginButton = document.getElementById('switchToLoginButton');

const container = document.getElementById('container');

// Show login section by default
loginSection.style.display = 'flex';
registrationSection.style.display = 'flex';

switchToRegisterButton.addEventListener('click', () => {
    container.classList.add("active");
});

switchToLoginButton.addEventListener('click', () => {
    container.classList.remove("active");
});

// Login User
loginButton.addEventListener('click', async () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    // Clear previous error message
    loginError.textContent = '';

    if (!email || !password) {
        loginError.textContent = 'Both fields are required.'; // Display error in the loginError element
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Check user's role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData.role;

            // Redirect based on role
            if (role === 'receptionist') {
                window.location.href = '../ReceptionistFolder/receptionist_store.html';
            } else if (role === 'doctor') {
                window.location.href = '../DoctorFolder/doctor_store.html';
            }
        } else {
            loginError.textContent = 'User role not found!'; // Display error in the loginError element
        }
    } catch (error) {
if (error.code === 'auth/invalid-email') {
    loginError.textContent = 'Invalid email format. Please enter a valid email.';
} else if (error.code === 'auth/user-not-found') {
    loginError.textContent = 'No user found with this email.';
} else if (error.code === 'auth/wrong-password') {
    loginError.textContent = 'Incorrect password. Please try again.';
} else {
    loginError.textContent = error.message; // Display error in the loginError element
}
    }
});

// Register User
registerButton.addEventListener('click', async () => {
    const email = registerEmail.value;
    const password = registerPassword.value;
    const role = registerRole.value;

    if (!email || !password || !role) {
        registerError.textContent = 'All fields are required.'; // Display error in the registerError element
        return;
    }

    try {
        // Register with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Save role in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: role,
        });

        registerError.textContent = '';
        alert('User registered successfully! You can now log in.');
        window.location.href = '../index.html';
    } catch (error) {
        registerError.textContent = error.message; // Display error in the registerError element
    }
});
