import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const LihatMateri = () => {
  const [materiList, setMateriList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data materi dari Firestore
  const fetchMateri = async () => {
    try {
      const materiCollection = collection(db, "Materi");
      const snapshot = await getDocs(materiCollection);
      const materiData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMateriList(materiData); // Menyimpan data materi ke state
      setIsLoading(false); // Set loading false setelah data diambil
    } catch (error) {
      console.error("Error fetching materi:", error);
      Alert.alert("Error", "Gagal mengambil data materi.");
      setIsLoading(false);
    }
  };

  // Ambil data materi saat pertama kali halaman dimuat
  useEffect(() => {
    fetchMateri();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lihat Materi</Text>
      
      {isLoading ? (
        <Text>Loading...</Text> // Tampilkan loading saat data sedang diambil
      ) : (
        <ScrollView style={styles.scrollView}>
          {materiList.length === 0 ? (
            <Text style={styles.noMateri}>Tidak ada materi yang tersedia.</Text>
          ) : (
            materiList.map((materi) => (
              <View key={materi.id} style={styles.materiCard}>
                <Text style={styles.materiTitle}>{materi.materi}</Text>
                <Text style={styles.mataKuliah}>Mata Kuliah: {materi.matakuliah}</Text>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() => {
                    Alert.alert("Link Materi", `Klik untuk membuka materi di link: ${materi.linkDokumen}`);
                  }}
                >
                  <Text style={styles.linkButtonText}>Buka Materi</Text>
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
  materiCard: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  materiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mataKuliah: {
    fontSize: 16,
    marginBottom: 10,
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
  noMateri: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LihatMateri;
