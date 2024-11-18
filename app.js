const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = './data';
const dataPath = 'data/patients.json';

//membuat folder data pasien jika belum ada
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file patients.json jika belum ada
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const showPatient = () => {
  const fileBuffer = fs.readFileSync('data/patients.json', 'utf-8');
  const patients = JSON.parse(fileBuffer);

  console.log("\n--- Daftar Pasien ---");
  if (patients.length === 0) {
    console.log("Tidak ada data pasien.");
  } else {
    console.log(patients);
  }
};

const addPatient = () => {
rl.question('Masukkan Nama Pasien : ', (nama) => {
  rl.question('Masukkan Umur : ', (umur) => {
    rl.question('Masukkan Keluhan : ', (keluhan) => {
      
      const patient = { nama, umur, keluhan };
      const fileBuffer = fs.readFileSync('data/patients.json', 'utf-8');
      const patients = JSON.parse(fileBuffer);

      patients.push(patient);
      fs.writeFileSync(dataPath, JSON.stringify(patients, null, 2));
      
      console.log(`Data Pasien ${nama} berhasil di simpan.`);

      showPatient();
      rl.close();
    });
  });
});
};

addPatient();
