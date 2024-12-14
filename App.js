import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen'; // Import LoginScreen
import DosenHome from './src/components/DosenHome'; // Import DosenHome
import MahasiswaHome from './src/components/MahasiswaHome'; // Import MahasiswaHome
import UploadMateri from './src/components/UploadMateri'; // Import UploadMateri
import UploadTugas from './src/components/UploadTugas'; // Import UploadMateri
import Absen from './src/components/Absen'; // 
import LihatMateri from './src/components/LihatMateri';
import LihatTugas from './src/components/LihatTugas';
import UploadTugasMahasiswa from './src/components/UploadTugasMahasiswa';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Define Screens properly */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DosenHome" component={DosenHome} />
        <Stack.Screen name="MahasiswaHome" component={MahasiswaHome} />
        <Stack.Screen name="UploadMateri" component={UploadMateri} />
        <Stack.Screen name="UploadTugas" component={UploadTugas} />
        <Stack.Screen name="Absen" component={Absen} />
        <Stack.Screen name="LihatMateri" component={LihatMateri} />
        <Stack.Screen name="LihatTugas" component={LihatTugas} />
        <Stack.Screen name="UploadTugasMahasiswa" component={UploadTugasMahasiswa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
