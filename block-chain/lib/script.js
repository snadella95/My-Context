/**
 * Update the patient problems
 * @param {org.example.patientdata.PatientProblems} tx - update problems of patient
 * @transaction
 */
async function updatePatientProblems(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.previousProblems = tx.asset.Problems.filter( problem => !tx.problem.includes(problem));
  tx.asset.Problems = tx.problem;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Update the medications
 * @param {org.example.patientdata.MedicationsChange} tx - update the medications
 * @transaction
 */
async function updateMedications(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.previousMedications = tx.asset.Medications.filter( medication => !tx.presentMedications.includes(medication));
  tx.asset.Medications = tx.presentMedications;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Update the allergies
 * @param {org.example.patientdata.AllergiesChange} tx - update the allergies
 * @transaction
 */
async function updateAllergies(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.previousAllergies = tx.asset.Allergies.filter(allergy => !tx.presentAllergies.includes(allergy));
  tx.asset.Allergies = tx.presentAllergies;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Update the vitals
 * @param {org.example.patientdata.VitalsChange} tx - update the Vitals
 * @transaction
 */
async function updateVitals(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.asset.vitals = tx.presentVitals;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Update the labs
 * @param {org.example.patientdata.LabsChange} tx - update the Labs
 * @transaction
 */
async function updateLabs(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.previousLabs = tx.asset.labs.filter(lab => tx.presentLabs.includes(lab));
  tx.asset.labs = tx.presentLabs;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Create the Doctors
 * @param {org.example.patientdata.DoctorsChange} tx - update the Doctors
 * @transaction
 */
async function updateDoctors(tx){
  
  asset = tx.asset;
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  tx.asset.doctors = tx.presentDoctors;
  await assetRegistry.update(tx.asset);
  
}

/**
 * Create Patient
 * @param {org.example.patientdata.createPatient} tx - create new Patient Participant
 * @transaction
 */
async function createNewPatient(tx){
 
  let factory = getFactory();
  let participantRegistry = await getParticipantRegistry('org.example.patientdata.Patient');
  let new_user = factory.newResource('org.example.patientdata', 'Patient' , tx.patient.email);
  new_user.firstName = tx.patient.firstName;
  new_user.lastName = tx.patient.lastName;
  new_user.Phone = tx.patient.Phone;
  new_user.Address = tx.patient.Address;
  new_user.DOB = tx.patient.DOB;
  new_user.Status = tx.patient.Status;
  new_user.Gender = tx.patient.Gender;
  await participantRegistry.add(new_user);
  
}

/**
 * Create new medical record
 * @param {org.example.patientdata.createMedicalRecord} tx - create new Medical Record
 * @transaction
 */
async function createNewMedicalRecord(tx){
 
  let factory = getFactory();
  let assetRegistry = await getAssetRegistry('org.example.patientdata.MedicalRecord');
  let new_user = factory.newResource('org.example.patientdata', 'MedicalRecord' , tx.record.RecordsId);
  new_user.Owner = tx.record.Owner;
  new_user.date = tx.record.date;
  new_user.doctors = tx.record.doctors;
  new_user.vitals = tx.record.vitals;
  new_user.Problems = tx.record.Problems;
  new_user.Medications = tx.record.Medications;
  new_user.Allergies = tx.record.Allergies;
  await assetRegistry.add(new_user);

}

/**
 * create doctor
 * @param {org.example.patientdata.createDoctor} tx - create new Doctor Participant
 * @transaction
 */
async function createNewDoctor(tx){
 
  let factory = getFactory();
  let participantRegistry = await getParticipantRegistry('org.example.patientdata.Doctor');
  let new_user = factory.newResource('org.example.patientdata', 'Doctor' , tx.doctor.email);
  new_user.firstName = tx.doctor.firstName;
  new_user.lastName = tx.doctor.lastName;
  new_user.Phone = tx.doctor.Phone;
  new_user.Gender = tx.doctor.Gender;
  await participantRegistry.add(new_user);
  
}
