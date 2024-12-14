import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DosenHome = () => {

  const navigation = useNavigation();
  const handleUploadMateri = () => {
    navigation.navigate('UploadMateri'); // Navigasi ke halaman UploadMateri
  };

  const handleUploadTugas = () => {
    // Logika untuk upload tugas
    navigation.navigate('UploadTugas');
  };

  const handlePenilaian = () => {
    // Logika untuk penilaian
    Alert.alert("Fitur Penilaian", "Silakan lakukan penilaian mahasiswa.");
  };

  const handleAbsenDosen = () => {
    navigation.navigate('Absen');
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selamat Datang, Dosen!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUploadMateri} style={styles.button}>
          <Text style={styles.buttonText}>Upload Materi</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUploadTugas} style={styles.button}>
          <Text style={styles.buttonText}>Upload Tugas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePenilaian} style={styles.button}>
          <Text style={styles.buttonText}>Penilaian</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAbsenDosen()} style={styles.button}>
          <Text style={styles.buttonText}>Absen Dosen</Text>
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
    backgroundColor: '#007bff',
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

export default DosenHome;
