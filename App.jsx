import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';
import DrawerNavigation from './Navigation/DrawerNavigation';
import { Alert } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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



  return (

    <AuthProvider>
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  )
}
export default App


