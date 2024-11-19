const readline = require('readline');
const {
  initializeData,
  showPatients,
  addPatient,
  editPatient,
  deletePatient,
} = require('./patients');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

// Menu utama
const mainMenu = async () => {
  console.log("\n=== Patients App Menu ===");
  console.log("1. Tambah Pasien");
  console.log("2. Tampilkan Semua Pasien");
  console.log("3. Edit Pasien");
  console.log("4. Hapus Pasien");
  console.log("5. Keluar");

  const choice = await askQuestion('\nPilih menu (1-5): ');
  switch (choice) {
    case '1': {
      const nama = await askQuestion('Masukkan Nama Pasien: ');
      const umur = await askQuestion('Masukkan Umur: ');
      const keluhan = await askQuestion('Masukkan Keluhan: ');
      addPatient(nama, umur, keluhan);
      break;
    }
    case '2':
      showPatients();
      break;
    case '3': {
      showPatients();
      const index = parseInt(await askQuestion('\nPilih nomor pasien yang ingin diedit: ')) - 1;
      const nama = await askQuestion('Masukkan Nama Baru: ');
      const umur = await askQuestion('Masukkan Umur Baru: ');
      const keluhan = await askQuestion('Masukkan Keluhan Baru: ');
      editPatient(index, nama, umur, keluhan);
      break;
    }
    case '4': {
      showPatients();
      const index = parseInt(await askQuestion('\nPilih nomor pasien yang ingin dihapus: ')) - 1;
      deletePatient(index);
      break;
    }
    case '5':
      console.log('Terima kasih telah menggunakan aplikasi ini!');
      rl.close();
      return;
    default:
      console.log('Pilihan tidak valid.');
  }
  mainMenu(); // Tampilkan menu lagi setelah selesai
};

// Inisialisasi dan jalankan aplikasi
initializeData();
mainMenu();
