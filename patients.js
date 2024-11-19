const fs = require('fs');

const dirPath = './data';
const dataPath = `${dirPath}/patients.json`;

const initializeData = () => {
    if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    if(!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]', 'utf-8');
};

const readPatients = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));


const writePatients = (patients) => {
    fs.writeFileSync(dataPath, JSON.stringify(patients, null, 2));
};


const showPatients = () => {
    const patients = readPatients();
    console.log("\n--- Daftar Pasien ---");

    if (patients.length === 0) {
      console.log("Tidak ada data pasien.");
    } else {
        patients.forEach((patient, index) => {
        console.log(`${index + 1}. Nama: ${patient.nama}, Umur: ${patient.umur}, Keluhan: ${patient.keluhan}`);
    });
  };
};
  

const addPatient = (nama, umur, keluhan) => {
    const patients = readPatients();
    patients.push({nama, umur, keluhan});
    writePatients(patients);
    console.log(`\nData Pasien ${nama} berhasil di simpan.`);
};

const editPatient = (index, nama, umur, keluhan) => {
    const patients = readPatients();
    if (index >= 0 && index < patients.length) {
      patients[index] = { nama, umur, keluhan };
      writePatients(patients);
      console.log(`\nData pasien nomor ${index + 1} berhasil diupdate.`);
    } else {
      console.log('Indeks pasien tidak valid.');
    }
  };
  

  const deletePatient = (index) => {
    const patients = readPatients();
    if (index >= 0 && index < patients.length) {
      const deleted = patients.splice(index, 1);
      writePatients(patients);
      console.log(`\nData pasien ${deleted[0].nama} berhasil dihapus.`);
    } else {
      console.log('Indeks pasien tidak valid.');
    }
  };
  
  module.exports = {
    initializeData,
    showPatients,
    addPatient,
    editPatient,
    deletePatient,
  };
