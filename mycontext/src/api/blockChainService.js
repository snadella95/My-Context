import Axios from "axios";
const url_get_patient_details = "http://35.231.10.184:3000/api/org.example.patientdata.Patient";
const url_get_doctor_details = "http://35.231.10.184:3000/api/org.example.patientdata.Doctor";
const append_for_Owner = "resource:org.example.patientdata.Patient";
const append_for_MedicalRecords = "resource:org.example.patientdata.MedicalRecord";
const append_for_doctors = "resource:org.example.patientdata.Doctor";
const url_get_patientmedications = "http://35.231.10.184:3000/api/org.example.patientdata.MedicationsChange";
const url_get_patientallergies = "http://35.231.10.184:3000/api/org.example.patientdata.AllergiesChange";
const url_get_medicalrecords = "http://35.231.10.184:3000/api/org.example.patientdata.MedicalRecord";
const url_get_patientproblems = "http://35.231.10.184:3000/api/org.example.patientdata.PatientProblems";
const url_get_vitalsTransaction = "http://35.231.10.184:3000/api/org.example.patientdata.VitalsChange";
const url_get_doctorchanges = "http://35.231.10.184:3000/api/org.example.patientdata.DoctorsChange";

const get_patient_myprofile = (email, role) => {
    const params = {
        "filter": {
            "where": {
                "email": `${email}`
            }
        }
    }
    const url = (role === "Patient" ? url_get_patient_details : url_get_doctor_details);
    console.log("Role is : " + role);
    console.log("Email" + email);

    return new Promise((resolve, reject) => {
        Axios.get(`${url}`, { params })
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })
}

const put_patient_myprofile = (data) => {
    // console.log("Encoded URL : " + encodeURIComponent(`${data.email}`));
    // const url = (role === "Patient" ? url_get_patient_details : url_get_doctor_details);
    return new Promise((resolve, reject) => {
        fetch(`${url_get_patient_details}/${encodeURIComponent(`${data.email}`)}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": data.firstName ? data.firstName : " ",
                "lastName": data.lastName ? data.lastName : " ",
                "Phone": data.Phone ? data.Phone : " ",
                "Address": data.Address ? data.Address : " ",
                "DOB": data.DOB ? data.DOB : " ",
                "Status": data.Status ? data.Status : " ",
                "Gender": data.Gender ? data.Gender : "Male",
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
}

const put_doctor_myprofile = (data) => {
    return new Promise((resolve, reject) => {
        fetch(`${url_get_doctor_details}/${encodeURIComponent(`${data.email}`)}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": data.firstName ? data.firstName : " ",
                "lastName": data.lastName ? data.lastName : " ",
                "Phone": data.Phone ? data.Phone : " ",
                "Gender": data.Gender ? data.Gender : "Male",
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
}

const get_vitals = (email) => {
    console.log("GET VITALS " + `${append_for_Owner}#${encodeURIComponent(email)}`);
    const url = new URL(`${url_get_medicalrecords}`);
    const params = {
        "filter": {
            "where": {
                "Owner": `${append_for_Owner}#${email}`
            }
        }
    }
    return new Promise((resolve, reject) => {
        Axios.get(`${url}`, { params })
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })
}

const put_patient_problems = (recordsId, payload) => {

    console.log("Records ID " + recordsId);

    return new Promise((resolve, reject) => {
        fetch(`${url_get_patientproblems}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "asset": `${append_for_MedicalRecords}#${recordsId}`,
                    "problem": [...payload]
                })
            }).then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => reject(err))
    })

}

const put_patient_medications = (recordsid, payload) => {

    return new Promise((resolve, reject) => {
        fetch(`${url_get_patientmedications}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "asset": `${append_for_MedicalRecords}#${recordsid}`,
                    "presentMedications": [...payload]
                })
            }).then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => reject(err))
    })

}

const put_patient_vitals = (recordId, payload) => {
    return new Promise((resolve, reject) => {
        fetch(`${url_get_vitalsTransaction}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "asset": `${append_for_MedicalRecords}#${recordId}`,
                "presentVitals": {
                    "$class": "org.example.patientdata.Vitals",
                    "GeneralAppearance": payload.GeneralAppearance,
                    "Height": payload.Height,
                    "Weight": payload.Weight,
                    "Temperature": payload.Temperature,
                    "Rythm": payload.Rythm,
                    "BP": payload.BP,
                    "Eyes": payload.Eyes,
                    "EarNoseThroat": payload.EarNoseThroat,
                    "CardioVascular": payload.CardioVascular,
                    "Respiratory": payload.Respiratory,
                    "Gastrointestinal": payload.Gastrointestinal,
                    "Genitourinary": payload.Genitourinary,
                    "MusculoSkeletal": payload.MusculoSkeletal,
                    "Skin": payload.Skin,
                    "NeuroLogic": payload.NeuroLogic,
                    "Pyschiatric": payload.Pyschiatric,
                    "Endocrine": payload.Endocrine,
                    "problemsVital": payload.problemsVital
                }
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
}

const get_patient_problems = (email) => {
    return new Promise((resolve, reject) => {
        fetch(`${url_get_medicalrecords}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {
                "filter": { "where": { "Owner": `${append_for_Owner}${encodeURIComponent(email)}` } }
            }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
}

const get_patient_medications = (email) => {

    return new Promise((resolve, reject) => {
        fetch(`${url_get_medicalrecords}`, {
            method: 'GET',
            params: {
                "filter": { "where": { "Owner": `${append_for_Owner}${encodeURIComponent(email)}` } }
            }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => { reject(err) })
    });
}

const get_vitals_transaction = (recordsid) => {

    const params = {
        "filter": {
            "where": {
                "asset": `${append_for_MedicalRecords}#${recordsid}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_vitalsTransaction}`, { params })
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })
}

const get_problems_transaction = (recordsid) => {

    const params = {
        "filter": {
            "where": {
                "asset": `${append_for_MedicalRecords}#${recordsid}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_patientproblems}`, { params })
            .then(response => {
                resolve(response.data);
            })
            .catch((err) => { reject(err) });
    })

}


const get_medications_transaction = (recordsid) => {

    const params = {
        "filter": {
            "where": {
                "asset": `${append_for_MedicalRecords}#${recordsid}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_patientmedications}`, { params })
            .then(response => {
                resolve(response.data);
            })
            .catch((err) => { reject(err) });
    })
}

const get_allergies_transaction = (recordsid) => {

    const params = {
        "filter": {
            "where": {
                "asset": `${append_for_MedicalRecords}#${recordsid}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_patientallergies}`, { params })
            .then(response => {
                resolve(response.data);
            })
            .catch((err) => { reject(err) });
    })
}

const put_patient_allergies = (recordsid, payload) => {
    return new Promise((resolve, reject) => {
        fetch(`${url_get_patientallergies}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "asset": `${append_for_MedicalRecords}#${recordsid}`,
                    "presentAllergies": [...payload]
                })
            }).then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => reject(err))
    })
}

const get_all_doctors = () => {
    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_doctor_details}`)
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })
}


const put_patient_permission_update = (recordsid, doctor_email) => {

    return new Promise((resolve, reject) => {
        fetch(`${url_get_doctorchanges}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "asset": `${append_for_MedicalRecords}#${recordsid}`,
                    "presentDoctors": `resource:org.example.patientdata.Doctor#${doctor_email}`
                })
            }).then(response => response.json())
            .then(json => resolve(json))
            .catch((err) => reject(err))
    })

}

const get_records_doctor = (email) => {

    const params = {
        "filter": {
            "where": {
                "doctors": `resource:org.example.patientdata.Doctor#${email}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_medicalrecords}`, { params })
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })

};

const get_patientrecord = (email) => {

    console.log(email);

    const params = {
        "filter": {
            "where": {
                "Owner": `${email}`
            }
        }
    }

    return new Promise((resolve, reject) => {
        Axios.get(`${url_get_medicalrecords}`, { params })
            .then(response => {
                resolve(response.data)
            })
            .catch((err) => { reject(err) })
    })

};

export default {
    patient_myprofile_request: (email, role) => get_patient_myprofile(email, role),
    patient_myprofile_update: (data) => put_patient_myprofile(data),
    doctor_myprofile_update: (data) => put_doctor_myprofile(data),
    patient_vitals_update: (recordId, payload) => put_patient_vitals(recordId, payload),
    patient_vitals_get: (email) => get_vitals(email),
    patient_problems_get: (email) => get_patient_problems(email),
    patient_problems_update: (recordsId, data) => put_patient_problems(recordsId, data),
    patient_medications_get: (email) => get_patient_medications(email),
    patient_medications_update: (recordsId, email) => put_patient_medications(recordsId, email),
    patient_allergies_update: (recordsid, payload) => put_patient_allergies(recordsid, payload),
    transaction_vitals_get: (recordsid) => get_vitals_transaction(recordsid),
    transaction_problems_get: (recordsid) => get_problems_transaction(recordsid),
    transaction_medications_get: (recordsid) => get_medications_transaction(recordsid),
    transaction_allergies_get: (recordsid) => get_allergies_transaction(recordsid),
    patient_get_alldoctors: () => get_all_doctors(),
    patient_doctor_permissions_update: (recordsid, doctor_email) => put_patient_permission_update(recordsid, doctor_email),
    doctor_records_get: (email) => get_records_doctor(email),
    doctor_patientrecord_get: (email) => get_patientrecord(email)
}