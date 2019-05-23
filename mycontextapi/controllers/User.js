const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Axios = require('axios');
const fetch = require('node-fetch');

exports.register = (request, response) => {
    const { role, username, email, password, password2 } = request.body;

    // Check for empty fields
    if (!role || !username || !email || !password || !password2) {
        response.json({ success: false, message: "Please fill all the fields" });
    }

    // Check for password match
    if (password !== password2) {
        response.json({ success: false, message: "Passwords donot match" });
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                response.json({ success: false, message: "User Already exists" });
            }
            else {
                const newUser = new User({
                    role,
                    username,
                    email,
                    password
                });
                //console.log(newUser);

                // Hash the password using bcrypt, salt
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Update password to hashed password
                        newUser.password = hash;
                        // Save the user
                        newUser.save()
                            .then(user => {

                                if (user.role === 'Doctor') {
                                    Axios.post('http://35.231.10.184:3000/api/org.example.patientdata.createDoctor', {
                                        "doctor": {
                                            "$class": "org.example.patientdata.Doctor",
                                            "email": `${user.email}`,
                                            "firstName": "",
                                            "lastName": "",
                                            "Phone": "",
                                            "Gender": "Male"
                                        }
                                    })
                                        .then(res => {
                                            response.json({ success: true, message: "Registered Successfully" });
                                            console.log("Doctor : " + JSON.stringify(response.data));
                                        })
                                        .catch(err => {
                                            console.log(JSON.stringify(err));
                                            response.json({ success: false, message: "Failed to create user in blockchain" });
                                        })
                                }

                                else if (user.role === 'Patient') {
                                    Axios.post('http://35.231.10.184:3000/api/org.example.patientdata.createPatient',
                                        {
                                            "patient": {
                                                "$class": "org.example.patientdata.Patient",
                                                "email": `${user.email}`,
                                                "firstName": "",
                                                "lastName": "",
                                                "Phone": "",
                                                "Address": "",
                                                "DOB": "",
                                                "Status": "Active",
                                                "Gender": "Male"
                                            }
                                        })
                                        .then(res => {
                                            Axios.post('http://35.231.10.184:3000/api/org.example.patientdata.createMedicalRecord',
                                                {
                                                    "record": {
                                                        "RecordsId": `${Math.floor(Math.random() * (10000 - 1 + 1)) + 1}`,
                                                        "Owner": `resource:org.example.patientdata.Patient#${user.email}`,
                                                        "vitals": {
                                                            "$class": "org.example.patientdata.Vitals",
                                                            "GeneralAppearance": "denies fatigue, malaise, fever, weight loss",
                                                            "Height": "",
                                                            "Weight": "",
                                                            "Temperature": "",
                                                            "Rythm": "",
                                                            "BP": "",
                                                            "Eyes": "denies blurring, diplopia, irritation, discharge",
                                                            "EarNoseThroat": "denies ear pain or discharge, nasal obstruction or discharge, sore throat",
                                                            "CardioVascular": "denies chest pain, palpitations, paroxysmal nocturnal dyspnea, orthopnea, edema",
                                                            "Respiratory": "denies coughing, wheezing, dyspnea, hemoptysis",
                                                            "Gastrointestinal": "denies abdominal pain, dysphagia, nausea, vomiting, diarrhea, constipation",
                                                            "Genitourinary": "denies hematuria, frequency, urgency, dysuria, discharge, impotence, incontinence",
                                                            "MusculoSkeletal": "denies back pain, joint swelling, joint stiffness, joint pain",
                                                            "Skin": "denies rashes, itching, lumps, sores, lesions, color change",
                                                            "NeuroLogic": "denies syncope, seizures, transient paralysis, weakness, paresthesias",
                                                            "Pyschiatric": "denies depression, anxiety, mental disturbance, difficulty sleeping, suicidal ideation",
                                                            "Endocrine": "denies polyuria, polydipsia, polyphagia, weight change, heat or cold intolerance",
                                                            "problemsVital": ""
                                                        },
                                                        "date": "2019-05-12T12:07:26.841Z",
                                                        "Problems": [],
                                                        "Medications": [],
                                                        "Allergies": []
                                                    }
                                                })
                                                .then(resp => {
                                                    response.json({ success: true, message: "Registered Successfully" });
                                                })
                                                .catch(err => {
                                                    response.json({ success: false, message: "Failed to create medical record" });
                                                })
                                        })
                                        .catch(err => {
                                            response.json({ success: false, message: "Failed to create user in blockchain" });
                                        })
                                }

                                else {
                                    response.json({ success: false, message: "Something Failed" });
                                }
                            })
                            .catch(err => console.log(err));
                    }))
            }
        })

}


exports.authenticate = (request, response) => {

    User.findOne({ email: request.body.email },
        function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                response.json({ success: false, message: "Authentication failed" })
            }
            else {
                bcrypt.compare(request.body.password, user.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        const token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 10000 // 1 week in seconds
                        });

                        response.json({ success: true, token: 'JWT ' + token })
                    }
                    else {
                        response.json({ success: false, message: 'Authentication failed' });
                    }
                });
            }
        });

}

exports.dashboard = (request, response) => {
    response.json({ success: true, user: request.user });
}