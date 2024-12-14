// locationService.js
import * as Location from 'expo-location';

export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Izin lokasi tidak diberikan.');
  }
  return await Location.getCurrentPositionAsync({});
};
