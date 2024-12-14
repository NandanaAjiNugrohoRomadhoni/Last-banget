import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebaseConfig'; // Mengimpor konfigurasi Firebase Auth

// // // // Fungsi untuk registrasi pengguna baru
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        return true; // Mengembalikan true jika registrasi berhasil
    } catch (error) {
        console.error("Error during registration:", error.message);
        Alert.alert("Register Gagal!", error.message);
        return false; // Mengembalikan false jika terjadi kesalahan saat registrasi
    }
};

// // // // Fungsi untuk login pengguna
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return true; // Mengembalikan true jika login berhasil
    } catch (error) {
        console.error("Error during login:", error.message);
        Alert.alert('Login Gagal', error.message);
        return false; // Mengembalikan false jika login gagal
    }
};

// // // // Fungsi untuk logout pengguna
export const logout = async () => {
    try {
        await signOut(auth); // Melakukan logout pengguna
        console.log("User logged out");
    } catch (error) {
        console.error("Error during logout:", error.message);
    }
};
