// Select the logout button
import { signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { auth } from './firebase-config.js';
const logoutButton = document.getElementById('logoutButton');

// Logout functionality
logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('Logged out successfully!');
        // Redirect to login page
        window.location.href = '../index.html'; // Replace with your login page URL
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
});