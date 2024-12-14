import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const UploadMateri = () => {
  const [materiName, setMateriName] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [link, setLink] = useState('');
  const TambahMateri = async () => {
      try {
        const userCollection = collection(db, "Materi"); // Koleksi users di Firestore
        await addDoc(userCollection, {
            matakuliah: mataKuliah,
            materi: materiName,
            linkDokumen: link,
        }); // Ambil semua dokumen

      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Gagal mengambil data pengguna.");
      }
    };
  // Handle link input for Materi
  const handleLinkInput = (text) => {
    setLink(text);
  };

  // Simulate file upload, for demo purposes
  const handleFilePick = () => {
    // For demo purposes, we simulate the file selection with a placeholder
    const simulatedFile = { name: 'Materi.pdf', size: '2MB' }; // You can change this as per your needs
    setLink('');  // Clear the link when file is selected
  };

  const handleSubmit = () => {
    if (!materiName || !mataKuliah || (!file && !link)) {
      Alert.alert('Form Tidak Lengkap', 'Silakan lengkapi semua informasi materi.');
      return;
    }

    // Simulate upload process
    Alert.alert('Upload Berhasil', `Materi berhasil diupload!\nNama Materi: ${materiName}\nMata Kuliah: ${mataKuliah}\nLink: ${link || 'Tidak ada'}`);
    
    // Reset form after successful upload
    setMateriName('');
    setMataKuliah('');
    setLink('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Materi</Text>

      <TextInput
        placeholder="Nama Materi"
        value={materiName}
        onChangeText={(text) => setMateriName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nama Mata Kuliah"
        value={mataKuliah}
        onChangeText={(text) => setMataKuliah(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Masukkan Link Materi "
        value={link}
        onChangeText={handleLinkInput}
        style={styles.input}
      />


        <TouchableOpacity 
        onPress={() => {
            TambahMateri();
            Alert.alert(
            'Upload Berhasil', 
            `Materi berhasil diupload!\nNama Materi: ${materiName}\nMata Kuliah: ${mataKuliah}\nLink: ${link || 'Tidak ada'}`
            );
        }} 
        style={styles.button}
        >

        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
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
  fileInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
});

export default UploadMateri;
