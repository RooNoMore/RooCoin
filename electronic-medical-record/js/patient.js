// patient.js

let patients = [];

function savePatient(name, rut, age) {
    const patient = {
        id: patients.length + 1,
        name: name,
        rut: rut,
        age: age,
        evolutions: []
    };
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));
}

function loadPatients() {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
        patients = JSON.parse(storedPatients);
    }
    return patients;
}

function getPatientById(id) {
    return patients.find(patient => patient.id === id);
}

function addEvolution(patientId, evolution) {
    const patient = getPatientById(patientId);
    if (patient) {
        patient.evolutions.push(evolution);
        localStorage.setItem('patients', JSON.stringify(patients));
    }
}

// Load patients on page load
document.addEventListener('DOMContentLoaded', loadPatients);