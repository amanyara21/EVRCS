import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from '../Components/DrawerContent';
import useAuth from '../Hooks/useAuth';
import UserBookings from '../Screens/UserBookings';
import BookingHistory from '../Screens/BookingHistory';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const { user } = useAuth();
    if (!user) {
        return <StackNavigation />;
    }
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigation} />
            <Drawer.Screen name="UserBookings" component={UserBookings} />
            <Drawer.Screen name="BookingHistory" component={BookingHistory} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
