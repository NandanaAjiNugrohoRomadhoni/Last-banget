import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // State untuk email input
  const [password, setPassword] = useState(''); // State untuk password input
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]); // State untuk menyimpan data Firestore

  // Fungsi untuk mengambil data pengguna dari Firestore
  const bacauser = async () => {
    try {
      const userCollection = collection(db, "users"); // Koleksi users di Firestore
      const snapshot = await getDocs(userCollection); // Ambil semua dokumen
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id, // ID dokumen
        ...doc.data(), // Data dokumen
      }));
      setUsers(userData); // Simpan ke state
      console.log("Data Users:", userData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Gagal mengambil data pengguna.");
    }
  };
///////////////////////PURE FUNCTION
  const validateLogin = (email, password, users) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
  
    // Validasi input kosong
    if (cleanEmail === '' || cleanPassword === '') {
      return { success: false, message: "Email dan password tidak boleh kosong." };
    }
  
    const matchedUser = users.find(
      (user) => user.Email === cleanEmail && user.Password === cleanPassword
    );
  
    if (matchedUser) {
      return { success: true, matchedUser };
    } else {
      return { success: false, message: "Email atau password salah." };
    }
  };
  
  // Ambil data pengguna saat komponen pertama kali di-mount
  useEffect(() => {
    bacauser();
  }, []);

  // Fungsi login untuk memvalidasi email dan password
  const handleLogin = () => {
    const cleanEmail = email.trim(); // Hapus spasi tambahan
    const cleanPassword = password.trim();

    // Validasi input kosong
    if (cleanEmail === '' || cleanPassword === '') {
      Alert.alert("Login Gagal!", "Email dan password tidak boleh kosong.");
      return;
    }

    setIsLoading(true); // Aktifkan loading state

    // Bandingkan input email dan password dengan data Firestore
    const matchedUser = users.find(
      (user) => user.Email === cleanEmail && user.Password === cleanPassword
    );

    // Jika ditemukan, login berhasil
    if (matchedUser) {
      Alert.alert("Login Berhasil!", `Selamat datang, ${matchedUser.Nama}`);
      console.log("Login berhasil:", matchedUser);

      // Navigasi berdasarkan peran pengguna
      if (matchedUser.Role === "Mahasiswa") {
        // Navigasi ke halaman MahasiswaHome
        navigation.navigate("MahasiswaHome");
      } else if (matchedUser.Role === "Dosen") {
        // Navigasi ke halaman DosenHome
        navigation.navigate("DosenHome");
      } else {
        // Jika peran tidak dikenal, beri tahu pengguna
        Alert.alert("Login Gagal!", "Peran pengguna tidak dikenali.");
      }
    } else {
      // Jika tidak ada yang cocok
      Alert.alert("Login Gagal!", "Email atau password salah.");
      console.log("Login gagal: Data tidak cocok.");
    }

    setIsLoading(false); // Nonaktifkan loading state
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 10, borderBottomWidth: 1, height: 40 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ marginBottom: 20, borderBottomWidth: 1, height: 40 }}
      />

      <Button
        title={isLoading ? "Loading..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};

export default LoginScreen;
