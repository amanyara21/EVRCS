import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen'
import LoginScreen from '../Screens/LoginScreen'
import useAuth from '../Hooks/useAuth';
import SignupScreen from '../Screens/SignupScreen';
import AuthScreen from '../Screens/AuthScreen';
import BookingScreen from '../Screens/BookingScreen';
import ReviewScreen from '../Screens/ReviewScreen';


const Stack = createStackNavigator()

const StackNavigation = () => {
  const { user } = useAuth();
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ?
        <>
          <Stack.Screen name="Main" component={HomeScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          {/* <Stack.Screen name="Pay" component={PaymentScreen} /> */}
        </> :
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>}
    </Stack.Navigator>
  )
}
export default StackNavigation