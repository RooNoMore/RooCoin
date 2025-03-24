// app.js

document.addEventListener('DOMContentLoaded', () => {
    const patientList = document.getElementById('patient-list');
    const newPatientForm = document.getElementById('new-patient-form');
    const newEvolutionForm = document.getElementById('new-evolution-form');
    const newExamForm = document.getElementById('new-exam-form');
    const patientDetails = document.getElementById('patient-details');

    // Recuperar pacientes del almacenamiento local
    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    if (patientList) {
        renderPatientList();
    }

    if (newPatientForm) {
        newPatientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPatient = {
                firstName: e.target.firstName.value,
                lastName1: e.target.lastName1.value,
                lastName2: e.target.lastName2.value,
                rut: e.target.rut.value,
                fileNumber: e.target.fileNumber.value,
                birthDate: e.target.birthDate.value,
                age: e.target.age.value,
                phone: e.target.phone.value,
                address: e.target.address.value,
                medicalHistory: e.target.medicalHistory.value,
                surgicalHistory: e.target.surgicalHistory.value,
                allergies: e.target.allergies.value,
                medications: e.target.medications.value,
                previousHospitalizations: e.target.previousHospitalizations.value,
                admissionDate: e.target.admissionDate.value,
                hospitalizationReason: e.target.hospitalizationReason.value,
                anamnesis: e.target.anamnesis.value,
                physicalExam: e.target.physicalExam.value,
                bedNumber: e.target.bedNumber.value,
                evolutions: [],
                exams: []
            };
            patients.push(newPatient);
            // Guardar pacientes en el almacenamiento local
            localStorage.setItem('patients', JSON.stringify(patients));
            window.location.href = 'patients.html';
        });
    }

    if (patientDetails) {
        const patientIndex = new URLSearchParams(window.location.search).get('index');
        const patient = patients[patientIndex];
        if (patient) {
            renderPatientDetails(patient);
        }
    }

    if (newEvolutionForm) {
        newEvolutionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const evolution = e.target.evolution.value;
            const timestamp = new Date().toLocaleString();
            const patientIndex = new URLSearchParams(window.location.search).get('index');
            patients[patientIndex].evolutions.push({ text: evolution, timestamp });
            // Guardar pacientes en el almacenamiento local
            localStorage.setItem('patients', JSON.stringify(patients));
            renderPatientDetails(patients[patientIndex]);
        });
    }

    if (newExamForm) {
        newExamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const exam = e.target.exam.value;
            const timestamp = new Date().toLocaleString();
            const patientIndex = new URLSearchParams(window.location.search).get('index');
            patients[patientIndex].exams.push({ text: exam, timestamp });
            // Guardar pacientes en el almacenamiento local
            localStorage.setItem('patients', JSON.stringify(patients));
            renderPatientDetails(patients[patientIndex]);
        });
    }

    function renderPatientList() {
        patientList.innerHTML = '';
        patients.forEach((patient, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="patient-detail.html?index=${index}">${patient.firstName} ${patient.lastName1} ${patient.lastName2}</a>
                <button class="discharge-btn" data-index="${index}">Dar de Alta</button>
            `;
            patientList.appendChild(li);
        });

        document.querySelectorAll('.discharge-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                patients.splice(index, 1);
                localStorage.setItem('patients', JSON.stringify(patients));
                renderPatientList();
            });
        });
    }

    function renderPatientDetails(patient) {
        document.getElementById('fullName').textContent = `${patient.firstName} ${patient.lastName1} ${patient.lastName2}`;
        document.getElementById('rut').textContent = patient.rut;
        document.getElementById('fileNumber').textContent = patient.fileNumber;
        document.getElementById('birthDate').textContent = patient.birthDate;
        document.getElementById('age').textContent = patient.age;
        document.getElementById('phone').textContent = patient.phone;
        document.getElementById('address').textContent = patient.address;
        document.getElementById('medicalHistory').textContent = patient.medicalHistory;
        document.getElementById('surgicalHistory').textContent = patient.surgicalHistory;
        document.getElementById('allergies').textContent = patient.allergies;
        document.getElementById('medications').textContent = patient.medications;
        document.getElementById('previousHospitalizations').textContent = patient.previousHospitalizations;
        document.getElementById('admissionDate').textContent = patient.admissionDate;
        document.getElementById('hospitalizationReason').textContent = patient.hospitalizationReason;
        document.getElementById('anamnesis').textContent = patient.anamnesis;
        document.getElementById('physicalExam').textContent = patient.physicalExam;
        document.getElementById('bedNumber').textContent = patient.bedNumber;

        const evolutionsList = document.getElementById('evolutions-list');
        evolutionsList.innerHTML = '';
        patient.evolutions.forEach(evolution => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${evolution.timestamp}:</strong> ${evolution.text}`;
            evolutionsList.appendChild(li);
        });

        const examsList = document.getElementById('exams-list');
        examsList.innerHTML = '';
        patient.exams.forEach(exam => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${exam.timestamp}:</strong> ${exam.text}`;
            examsList.appendChild(li);
        });
    }
});