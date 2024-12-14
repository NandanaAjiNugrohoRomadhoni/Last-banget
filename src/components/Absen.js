import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getDistanceFromLatLonInKm } from '../utils/distanceUtils'; // Impor fungsi jarak
import * as Location from 'expo-location';
import { db } from "../config/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

const campusCoordinates = {
  latitude: -8.1675, // Latitude kampus
  longitude: 113.6843, // Longitude kampus
};

const subjects = [
  { name: 'Functional Programming', time: 'Senin, 08:40 - 10:20' },
  { name: 'Kecerdasan Buatan', time: 'Senin, 10:30 - 12:00' },
  { name: 'Struktur Data', time: 'Senin, 13:00 - 14:30' },
  { name: 'Statistika', time: 'Selasa, 15:00 - 16:30' },
  { name: 'MKWU', time: 'Rabu, 08:40 - 10:20' },
  { name: 'MKSI', time: 'Rabu, 10:30 - 12:00' },
  { name: 'Riset Operasi', time: 'Rabu, 13:00 - 14:30' },
  { name: 'Arsitektur Komputer', time: 'Kamis, 15:00 - 16:30' },
  { name: 'Grafika Komputer', time: 'Jumat, 14:00 - 15:20' },
  { name: 'Praktikum', time: 'Sabtu, 10.00 - 12.40' },
];

const Absen = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [user] = useState({
    role: 'dosen', // Default role
    uid: '12345', // ID user
    nama: 'Nama User' // Nama user
  });

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(selectedDay.getDate() - 7);
    setSelectedDay(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(selectedDay.getDate() + 7);
    setSelectedDay(newDate);
  };

  const getWeekDays = () => {
    const weekDays = [];
    const startOfWeek = new Date(selectedDay);
    startOfWeek.setDate(selectedDay.getDate() - selectedDay.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push({ date: date.getDate(), fullDate: date });
    }

    return weekDays;
  };

  const getSubjectsForSelectedDay = () => {
    const dayOfWeek = selectedDay.getDay();
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const selectedDayName = dayNames[dayOfWeek];

    const allSubjects = subjects.filter((subject) => subject.time.startsWith(selectedDayName));

    if (user.role === 'dosen') {
      const dosenSubjects = ['Functional Programming', 'MKWU', 'MKSI', 'Praktikum', 'Statistika'];
      return allSubjects.filter((subject) => dosenSubjects.includes(subject.name));
    }

    return allSubjects;
  };

  const isWithinClassTime = (classTime, currentTime) => {
    const [dayName, timeRange] = classTime.split(', ');
    const [startTimeStr, endTimeStr] = timeRange.split(' - ');

    const todayDate = currentTime.toISOString().split('T')[0];
    const startTime = new Date(`${todayDate}T${startTimeStr}:00`);
    const endTime = new Date(`${todayDate}T${endTimeStr}:00`);

    return currentTime >= startTime && currentTime <= endTime;
  };

  const markAttendance = async (subject) => {
    const currentTime = new Date();
    const selectedDateStr = selectedDay.toISOString().split('T')[0];

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin lokasi diperlukan untuk absen!');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({}).catch(() => {
        alert('Tidak dapat mendapatkan lokasi. Pastikan GPS Anda aktif.');
        return null;
      });

      if (!userLocation) return;

      const distance = getDistanceFromLatLonInKm(
        campusCoordinates.latitude,
        campusCoordinates.longitude,
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );

      if (!isWithinClassTime(subject.time, currentTime)) {
        alert('Waktu absen tidak sesuai dengan jadwal mata kuliah!');
        return;
      }

      if (distance <= 10) {
        const attendanceRef = doc(
          collection(db, "Absen", selectedDateStr, user.role === "dosen" ? "Dosen" : "Mahasiswa"),
          user.uid
        );

        const attendanceData = {
          nama: user.nama,
          mataKuliah: subject.name,
          waktuAbsen: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          lokasi: {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          },
          status: "Hadir",
        };

        await setDoc(attendanceRef, attendanceData);

        setAttendance((prev) => ({
          ...prev,
          [selectedDateStr]: {
            ...(prev[selectedDateStr] || {}),
            [subject.name]: {
              attended: true,
              time: attendanceData.waktuAbsen,
            },
          },
        }));
        alert(`Berhasil absen untuk ${subject.name}`);
      } else {
        alert('Anda berada di luar jangkauan lokasi!');
      }
    } catch (error) {
      console.error("Error saat mencatat absen:", error);
      alert("Terjadi kesalahan saat mencatat absen.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedDay}>
        Hari/Tanggal:{' '}
        {selectedDay.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>

      <View style={styles.weekDaysContainer}>
        <TouchableOpacity onPress={goToPreviousWeek} style={styles.arrowButton}>
          <Text style={styles.arrowText}>⬅️</Text>
        </TouchableOpacity>
        {getWeekDays().map((day) => (
          <TouchableOpacity
            key={day.date}
            style={styles.dayButton}
            onPress={() => setSelectedDay(day.fullDate)}
          >
            <Text style={styles.dayText}>{day.date}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={goToNextWeek} style={styles.arrowButton}>
          <Text style={styles.arrowText}>➡️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getSubjectsForSelectedDay()}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const selectedDateStr = selectedDay.toISOString().split('T')[0];
          const isAttended = attendance[selectedDateStr]?.[item.name]?.attended;
          const attendedTime = attendance[selectedDateStr]?.[item.name]?.time;

          return (
            <View style={styles.subjectContainer}>
              <Text style={styles.subjectText}>{item.name}</Text>
              <Text style={styles.scheduleText}>{item.time}</Text>
              {isAttended ? (
                <Text style={styles.markedText}>Sudah Absen pada: {attendedTime}</Text>
              ) : (
                <TouchableOpacity
                  style={styles.attendanceButton}
                  onPress={() => markAttendance(item)}
                >
                  <Text style={styles.buttonText}>Absen</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  selectedDay: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  weekDaysContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  arrowButton: { padding: 10 },
  arrowText: { fontSize: 20 },
  dayButton: { marginHorizontal: 5, padding: 10, backgroundColor: '#eee', borderRadius: 5 },
  dayText: { fontSize: 16 },
  subjectContainer: { marginVertical: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 5 },
  subjectText: { fontSize: 18, fontWeight: 'bold' },
  scheduleText: { fontSize: 16, color: '#555' },
  markedText: { color: 'green', marginTop: 5 },
  attendanceButton: { marginTop: 10, backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default Absen;
