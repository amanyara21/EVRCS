import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './Hooks/useAuth';
import DrawerNavigation from './Navigation/DrawerNavigation';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const STRIPE_KEY= "pk_test_51Q3gdA2MOkOWDIHRXl270XmDRL5KcRwtmcco7tkNfVvLoJd2KKx8dTisTil1MQYLFrRBEPObYYd98GDFVtatCIpm00Db0wtoxO"

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
        <StripeProvider publishableKey={STRIPE_KEY}>
          <NavigationContainer>
            <DrawerNavigation />
          </NavigationContainer>
        </StripeProvider>
      </Provider>
    </AuthProvider>
  )
}
export default App


