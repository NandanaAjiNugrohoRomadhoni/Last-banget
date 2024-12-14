import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const LihatTugas = () => {
  const [tugasList, setTugasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data tugas dari Firestore
  const fetchTugas = async () => {
    try {
      const tugasCollection = collection(db, "Tugas");
      const snapshot = await getDocs(tugasCollection);
      const tugasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTugasList(tugasData); // Menyimpan data tugas ke state
      setIsLoading(false); // Set loading false setelah data diambil
    } catch (error) {
      console.error("Error fetching tugas:", error);
      Alert.alert("Error", "Gagal mengambil data tugas.");
      setIsLoading(false);
    }
  };

  // Ambil data tugas saat pertama kali halaman dimuat
  useEffect(() => {
    fetchTugas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lihat Tugas</Text>
      
      {isLoading ? (
        <Text>Loading...</Text> // Tampilkan loading saat data sedang diambil
      ) : (
        <ScrollView style={styles.scrollView}>
          {tugasList.length === 0 ? (
            <Text style={styles.noTugas}>Tidak ada tugas yang tersedia.</Text>
          ) : (
            tugasList.map((tugas) => (
              <View key={tugas.id} style={styles.tugasCard}>
                <Text style={styles.tugasTitle}>{tugas.namaTugas}</Text>
                <Text style={styles.mataKuliah}>Mata Kuliah: {tugas.matakuliah}</Text>
                <Text style={styles.deadline}>Deadline: {tugas.deadline}</Text>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => {
                    Alert.alert("Link Tugas", `Klik untuk membuka tugas di link: ${tugas.linkTugas}`);
                  }}
                >
                  <Text style={styles.linkButtonText}>Buka Tugas</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  tugasCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  tugasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mataKuliah: {
    fontSize: 16,
    marginBottom: 5,
  },
  deadline: {
    fontSize: 14,
    marginBottom: 10,
    color: 'gray',
  },
  linkButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  linkButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  noTugas: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LihatTugas;
