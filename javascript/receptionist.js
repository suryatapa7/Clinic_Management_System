import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import { auth, db } from './firebase-config.js';

const patientsCollection = collection(db, 'patients');
const billsCollection = collection(db, 'bills');

// DOM Elements
const patientNameInput = document.getElementById('patientName');
const patientAgeInput = document.getElementById('patientAge');
const patientContactInput = document.getElementById('patientContact');
const patientAddressInput = document.getElementById('patientAddress');
const addPatientButton = document.getElementById('addPatientButton');
const patientSelect = document.getElementById('patientSelect');
const billAmountInput = document.getElementById('billAmount');
const generateBillButton = document.getElementById('generateBillButton');

// DOM Elements for Patient History
const patientHistorySelect = document.getElementById('patientHistorySelect');
const patientHistoryDiv = document.getElementById('patientHistory');

// Initialize data
document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
    loadPatientHistoryDropdowns();
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, get user details
        console.log("Email:", user.email);
        document.getElementById('user_email').innerHTML = user.email;
    } else {
        // No user is signed in
        console.log("No user is currently logged in.");
    }
});


// Load patients into the dropdown
async function loadPatients() {
    patientSelect.innerHTML = `<option value="">Select Patient</option>`;
    const querySnapshot = await getDocs(patientsCollection);
    querySnapshot.forEach((doc) => {
        const patient = doc.data();
        patientSelect.innerHTML += `<option value="${doc.id}">${patient.name} (${patient.age})</option>`;
    });
}

// Function to generate the next token
async function getNextToken() {
    const tokenDocRef = doc(db, "settings", "lastToken");
    const tokenDoc = await getDoc(tokenDocRef);

    if (tokenDoc.exists()) {
        const lastToken = tokenDoc.data().lastToken;
        // console.log("Token : " + lastToken);

        const nextToken = lastToken + 1;

        // Update the lastToken in Firestore
        await updateDoc(tokenDocRef, { lastToken: nextToken });

        return nextToken;
    } else {
        // Initialize the token if not already present
        await setDoc(tokenDocRef, { lastToken: 1 });
        return 1;
    }
}

// Add new patient
addPatientButton.addEventListener('click', async () => {
    const name = patientNameInput.value.trim();
    const age = patientAgeInput.value.trim();
    const address = patientAddressInput.value.trim();
    const contact = patientContactInput.value.trim();
    // Get the next token
    const tokenNumber = await getNextToken();;
    // Create a personalized document ID
    const documentId = `${tokenNumber}`;


    if (name && age && contact) {
        // Use setDoc to add a document with the specified ID
        await setDoc(doc(db, "patients", documentId), {
            name,
            age,
            address,
            contact,
            tokenNumber,
        });

        // await addDoc(patientsCollection, { name, age, address, contact });
        patientNameInput.value = '';
        patientAgeInput.value = '';
        patientAddressInput.value = '';
        patientContactInput.value = '';
        alert('Patient added successfully! Token number : ' + tokenNumber);
        loadPatients();
        loadPatientHistoryDropdowns();
    } else {
        alert('Please fill in all fields.');
    }
});

// Generate bill
generateBillButton.addEventListener('click', async () => {
    const patientId = patientSelect.value;
    console.log(patientId);

    const billAmount = parseFloat(billAmountInput.value);

    if (patientId && !isNaN(billAmount) && billAmount > 0) {
        try {
            // Fetch patient details
            const patientDoc = doc(db, 'patients', patientId);
            const patientSnapshot = await getDoc(patientDoc);

            if (patientSnapshot.exists()) {
                const patient = patientSnapshot.data();

                // Add the bill
                const billDoc = await addDoc(billsCollection, {
                    patientId,
                    patientName: patient.name,
                    amount: billAmount,
                    prescription: '',
                    createdAt: new Date().toISOString(), // Add timestamp for history
                });

                alert('Bill generated successfully!');
                billAmountInput.value = ''; // Clear input
            } else {
                alert('Patient not found.');
            }
        } catch (error) {
            console.error('Error generating bill:', error);
            alert('Failed to generate bill. Please try again.');
        }
    } else {
        alert('Please select a patient and enter a valid bill amount.');
    }
});

// Load patients into history dropdowns (both receptionist and doctor)
async function loadPatientHistoryDropdowns() {
    const querySnapshot = await getDocs(patientsCollection);
    const options = `<option value="">Select Patient</option>`;
    const dropdownOptions = [...querySnapshot.docs]
        .map((doc) => {
            const patient = doc.data();
            return `<option value="${doc.id}">Token no=${patient.tokenNumber} ${patient.name} (${patient.age})</option>`;
        })
        .join('');

    patientHistorySelect.innerHTML = options + dropdownOptions;
}

// Load patient history with bill amounts
async function loadPatientHistory(patientId, historyDiv) {
    if (!patientId) {
        historyDiv.innerHTML = 'Please select a patient.';
        return;
    }

    const querySnapshot = await getDocs(billsCollection);
    const historyItems = [];
    querySnapshot.forEach((doc) => {
        const bill = doc.data();
        if (bill.patientId === patientId) {
            historyItems.push(`
        <div class="history-item">
          <strong>Token No:</strong> ${bill.patientId}<br>
          <strong>Amount:</strong> ₹</i>${bill.amount}<br>
		      <strong>Symptoms:</strong> ${bill.symptoms}<br>
          <strong>Prescription:</strong> ${bill.prescription || 'N/A'}<br>
          <strong>Date:</strong> ${new Date(
                bill.createdAt
            ).toLocaleString()}<br>
        </div>
      `);
        }
    });

    historyDiv.innerHTML = historyItems.length
        ? historyItems.join('')
        : 'No history available for this patient.';
}

// Event listeners for viewing history
patientHistorySelect.addEventListener('change', (e) => {
    loadPatientHistory(e.target.value, patientHistoryDiv);
});