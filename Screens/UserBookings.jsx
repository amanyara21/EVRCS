import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import useAuth from '../Hooks/useAuth';
import BookingCard from '../Components/BookingCard';
import Header from '../Components/Header';
import { API_URL } from '@env';
const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
          console.log(`${API_URL}/api/stations/bookings/${user._id}`)
            const response = await fetch(`${API_URL}/api/stations/bookings/${user._id}`);
            const data = await response.json();
            if (data.bookings != null && data.bookings.length!=0) {
                const today = new Date();
                const futureBookings = data.filter(booking => {
                    const bookingDate = new Date(booking.startTime);
                    return bookingDate >= today || bookingDate.toDateString() === today.toDateString();
                });
                setBookings(futureBookings);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        Alert.alert(
          'Delete Booking',
          'Are you sure you want to delete this booking?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  const response = await fetch(`${API_URL}/api/stations/bookings/${bookingId}`, {
                    method: 'DELETE',
                  });
    
                  if (response.ok) {
                    Alert.alert('Success', 'Booking deleted successfully');
                    fetchBookings()
                  } else {
                    Alert.alert('Error', 'Error deleting booking');
                  }
                } catch (error) {
                  Alert.alert('Error', error);
                }
              },
            },
          ],
          { cancelable: false }
        );
      };

    return (
        <>
            <Header title="Your Bookings" />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item) => item.bookingId.toString()}
                        renderItem={({ item }) => <BookingCard booking={item} onCancelBooking={handleCancelBooking} />}
                        ListEmptyComponent={!loading && <Text style={styles.notAvail}>No bookings available</Text>}
                    />
                )}
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#101944',
        height:'100%',
        padding: 20,
        paddingBottom: 50,
        alignItems: 'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notAvail:{
        fontSize:18
    }
})

export default UserBookings;
