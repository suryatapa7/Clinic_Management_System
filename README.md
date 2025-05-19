# Clinic Management System

The **Clinic Management System** is a web-based application designed to streamline operations in a clinic. It facilitates seamless interaction between receptionists and doctors while managing patient records, prescriptions and billing. The system is built with **HTML**, **CSS**, **JavaScript** and leverages **Firebase** for backend services.

---

## Architecture

### 1. Frontend (Client-Side Application)
The client-side application is responsible for user interaction and comprises the following modules:
- **Receptionist Module:**
  - Register patients with personal details.
  - System assigns sequential token numbers to the patients.
  - Generate bills.
  - View patient records.
- **Doctor Module:**
  - Access patient details using token numbers.
  - Add prescriptions and symptoms for patients.
  - View patient medical history for informed decision-making.
- **Shared Features:**
  - Both receptionist and doctor can view patient history.

### 2. Backend (Firebase Services)
The system uses Firebase for backend services:
- **Firebase Authentication:**
  - Manages user roles (Receptionist, Doctor).
  - Secures data access and ensures role-based permissions.
- **Firebase Firestore (Database):**
  - Stores:
    - Patient information (name, age, address, contact details and token numbers).
    - Prescriptions (symptoms and medicines added by doctors).
    - Billing information.
  - Provides real-time updates for seamless interaction between the receptionist and doctor.
- **Firebase Hosting:**
  - Hosts the web application, ensuring global availability and fast response times.

---

## Workflow
<img width="561" alt="Workflow" src="./images/403626929-13602891-b69a-410c-ae90-71bcb7a111d3.png" />


### 1. Patient Registration (Receptionist)
- Receptionist enters patient details into the system.
- A sequential token number is assigned to the patient by the system.
- The patient record is stored in Firestore.

### 2. Prescription Entry (Doctor)
- Doctor accesses patient records by token number.
- Adds symptoms and prescriptions to the patient’s history.
- Updates are saved in Firestore and synchronized in real-time.

### 3. Bill Creation (Receptionist)
- Receptionist generates a bill.
- Amount is recorded and the bill is stored in Firestore.

### 4. View Patient History
- Both the receptionist and doctor can view patient history.
- History is fetched from Firestore for easy tracking of past visits.

---

## Illustrations

Home Page: Login
<img width="960" alt="login page" src="./images/login_page.png" />

Home Page: Registration
<img width="960" alt="register page" src="./images/register_page.png" />

Receptionist Registration
<img width="960" alt="receptionist register" src="./images/receptionist_register.png" />

Receptionist Registration Success Confirmation
<img width="960" alt="receptionist register success" src="./images/receptionist_register_success.png" />

Receptionist Login
<img width="960" alt="receptionist login" src="./images/receptionist_login_success.png" />

Adding Patient Details
<img width="960" alt="Add Patient Details" src="./images/Adding_patient_details.png" />

Successful Addition of Patient and System Token Generation
<img width="960" alt="successful add patient" src="./images/successful_add_patient.png" />

Selecting Patient for Bill Generation
<img width="960" alt="selecting first patient" src="./images/Select_patient_bill_generate.png" />

Patient Bill Generation Amount
<img width="960" alt="Patient Bill Generation" src="./images/bill_generation_amount.png" />

Successful Bill Generation of First Patient
<img width="960" alt="successful bill generation" src="./images/successful_bill_generation.png" />

Receptionist Logout
<img width="960" alt="receptionist logout" src="./images/receptionist_logout.png" />

Doctor Registration
<img width="960" alt="Doctor Registration" src="./images/doctor_register.png" />

Doctor Registration Success Confirmation
<img width="960" alt="Doctor Registration Success" src="./images/doctor_register_success.png" />

Doctor Login
<img width="960" alt="Doctor Login Success" src="./images/doctor_login.png" />

Doctor's Add Prescription Page
<img width="960" alt="prescription page" src="./images/Add_prescription_page.png" />

Doctor Selecting Patient to Add Prescription
<img width="960" alt="Doctor Selecting Patient" src="./images/selecting_patient_detail.png" />

Doctor Adding Patient's Prescription
<img width="960" alt="Doctor adding prescription" src="./images/Add_patient_prescription.png" />

Confirmation for Adding Patient's Prescription
<img width="960" alt="Confirmation" src="./images/confirm_patient_prescription.png" />

Doctor's View Patient History Page
<img width="960" alt="view patient history" src="./images/doctor_View_Patient_history_page.png" />

Doctor Selecting Patient to View Patient History
<img width="960" alt="Doctor Selecting Patient History" src="./images/Select_patient_view_patient_history.png" />

Doctor's View of Patient History
<img width="960" alt="Doctor View of Patient History" src="./images/Doctor_View_First_Patient_History.png" />

Doctor Logout
![image](./images/doctor_logout.png)

Receptionist's View Patient History Page
<img width="960" alt="Receptionist View Patient History" src="./images/Receptionist&apos;s_View_Patient_History.png" />

Receptionist Selecting Patient to View Patient History
<img width="960" alt="Receptionist Selecting Patient" src="./images/Receptionist_Selecting_Patient _View_Patient_History.png" />

Receptionist's View of Patient History
<img width="960" alt="Receptionist View of Patient History" src="./images/Receptionist&apos;s_View_Patient History.png" />

Receptionist Logout
<img width="960" alt="Receptionist Logout" src="./images/receptionist_logout.png" />

Firebase User Authentication
<img width="960" alt="Firebase User Authentication" src="./images/Firebase_User_Authentication.png" />

User Receptionist in Firestore Database
<img width="960" alt="User Receptionist in Firestore" src="./images/User_Receptionist_Firestore_Database.png" />

User Doctor in Firestore Database
<img width="960" alt="User Doctor in Firestore" src="./images/User_Doctor_Firestore_Database.png" />

Patient Data in Firestore Database
<img width="960" alt="Patient Data in Firestore" src="./images/Patient_Firestore_Database.png" />

Bill Generation of Patient in Firestore Database
<img width="960" alt="Bill Generation of Patient" src="./images/Bill_Generation_of_Patient_Firestore_Database.png" />

---

## Security and Access Control
- **Role-Based Access:**
  - Receptionist: Register patients, view patient records and generate bills.
  - Doctor: Add prescriptions and view patient records.
- **Firestore Security Rules:**
  - Restrict read and write access based on the user’s role and authentication status.

---

## Key Advantages
1. **Scalability:**
   - Firebase’s serverless architecture automatically scales with the clinic’s needs.
2. **Real-Time Updates:**
   - Firestore ensures updated records are visible instantly.
3. **Modularity:**
   - Clear separation of responsibilities between receptionist and doctor.
4. **Ease of Deployment:**
   - Firebase Hosting makes the application globally accessible with minimal effort.
5. **Data Consistency:**
   - Using `serverTimestamp` ensures reliable and consistent timestamps.

---

## Future Enhancements
This architecture is designed to be flexible and scalable, allowing for potential future features such as:
- Appointment scheduling.
- Notifications for patients and staff.
- Advanced analytics for patient and clinic performance insights.
