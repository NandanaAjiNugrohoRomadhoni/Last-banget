import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MahasiswaHome = () => {
  const navigation = useNavigation();

  // Navigasi ke halaman materi
  const handleLihatMateri = () => {
    navigation.navigate('LihatMateri'); // Navigasi ke halaman LihatMateri
  };

  // Navigasi ke halaman tugas
  const handleLihatTugas = () => {
    navigation.navigate('LihatTugas'); // Navigasi ke halaman LihatTugas
  };

  // Navigasi ke halaman absen mahasiswa
  const handleAbsenMahasiswa = () => {
    navigation.navigate('Absen'); // Navigasi ke halaman Absen
  };

  // Fungsi untuk melihat nilai
  const handleUploadTugasMahasiswa = () => {
    // Logika untuk melihat nilai
    navigation.navigate("UploadTugasMahasiswa");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selamat Datang, Mahasiswa!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLihatMateri} style={styles.button}>
          <Text style={styles.buttonText}>Lihat Materi</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLihatTugas} style={styles.button}>
          <Text style={styles.buttonText}>Lihat Tugas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUploadTugasMahasiswa} style={styles.button}>
          <Text style={styles.buttonText}>Upload Tugas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAbsenMahasiswa} style={styles.button}>
          <Text style={styles.buttonText}>Absen Mahasiswa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#28a745', // Ganti warna tombol untuk membedakan dengan DosenHome
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MahasiswaHome;
