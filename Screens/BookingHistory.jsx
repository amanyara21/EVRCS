import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { API_URL } from '@env'
import useAuth from '../Hooks/useAuth';
import Header from '../Components/Header';

const BookingHistory = () => {
    const [loading, setLoading] = useState(true)
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${API_URL}/api/stations/bookings/${user._id}`);

            const data = await response.json();

            if (data.bookings != null && data.bookings.length!=0) {
                const today = new Date();
                const pastBookings = data.filter(booking => {
                    const bookingDate = new Date(booking.startTime);
                    return bookingDate < today;
                });
                setBookings(pastBookings);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <Header title="Booking History" />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item) => item.bookingId.toString()}
                        renderItem={({ item }) => <BookingCard booking={item} />}
                        ListEmptyComponent={!loading && <Text style={styles.notAvail}>No Bookings available</Text>}
                    />
                )}
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101944',
        paddingTop: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
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
});

export default BookingHistory;