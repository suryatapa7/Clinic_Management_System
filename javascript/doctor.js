import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { auth, db } from './firebase-config.js';

const patientsCollection = collection(db, 'patients');
const billsCollection = collection(db, 'bills');

// DOM Elements
const billSelect = document.getElementById('billSelect');
const symptomsInput = document.getElementById('symptomsInput');
const prescriptionInput = document.getElementById('prescriptionInput');
const addPrescriptionButton = document.getElementById('addPrescriptionButton');

// DOM Elements for Patient History
const doctorHistorySelect = document.getElementById('patientHistorySelect');
const doctorPatientHistoryDiv = document.getElementById('patientHistory');

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Email:", user.email);
        document.getElementById('user_email').innerHTML = user.email;
    } else {
        console.log("No user is currently logged in.");
    }
});

// Initialize data
document.addEventListener('DOMContentLoaded', () => {
    loadPatientHistoryDropdowns();
    loadBills();
});

// Load bills into dropdown
async function loadBills() {
    billSelect.innerHTML = `<option value="">Select Patient</option>`;
    try {
        const querySnapshot = await getDocs(billsCollection);
        console.log("Bills fetched:", querySnapshot.docs.length);
        querySnapshot.forEach((doc) => {
            const bill = doc.data();
            billSelect.innerHTML += `<option value="${doc.id}">Token no=${bill.patientId}, Name : ${bill.patientName}, Amount : ₹${bill.amount}</option>`;
        });
    } catch (error) {
        console.error("Error fetching bills:", error);
    }
}

// Add prescription to the bill
addPrescriptionButton.addEventListener('click', async () => {
    const billId = billSelect.value;
    const symptoms = symptomsInput.value.trim();
    const prescription = prescriptionInput.value.trim();

    if (billId && prescription) {
        const billDoc = doc(db, 'bills', billId);
        await updateDoc(billDoc, { symptoms, prescription });
        symptomsInput.value = '';
        prescriptionInput.value = '';
        alert('Prescription added!');
        loadBills();
    } else {
        alert('Please select a bill and enter a prescription.');
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

    doctorHistorySelect.innerHTML = options + dropdownOptions;
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
          <strong>Amount:</strong> ₹${bill.amount}<br>
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

doctorHistorySelect.addEventListener('change', (e) => {
    console.log(e.target.value);
    loadPatientHistory(e.target.value, doctorPatientHistoryDiv);
});
