import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';
import DrawerNavigation from './Navigation/DrawerNavigation';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (locationPermission === RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      console.log(state);
    } else {
      Alert.alert('Please turn on your internet connection.');
    }
  });

  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </AuthProvider>
  )
}
export default App