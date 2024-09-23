import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import useAuth from '../Hooks/useAuth';
import BookingCard from '../Components/BookingCard';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import {cancelBooking} from '../redux/bookingsSlice'
import {useDispatch,useSelector } from 'react-redux';

const UserBookings = () => {
    const { user } = useAuth();
    const dispatch = useDispatch()
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const allBookings = useSelector((state) => state.bookings.bookings);
    useEffect(() => {
        filterFutureBookings();
    }, [allBookings]);

    const filterFutureBookings = () => {
        const today = new Date();
        const futureBookings = allBookings.filter(booking => {
            const bookingDate = new Date(booking.startTime);
            return bookingDate >= today || bookingDate.toDateString() === today.toDateString();
        });

        setBookings(futureBookings);
        setLoading(false);
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
                            const response = await fetch(`https://evrcs-backend.vercel.app/api/stations/bookings/${bookingId}`, {
                                method: 'DELETE',
                            });
                            // console.log(response);

                            if (response.ok) {
                                Alert.alert('Success', 'Booking deleted successfully');
                                dispatch(cancelBooking(bookingId));
                            } else {
                                Alert.alert('Error', 'Error deleting booking');
                                dispatch(cancelBooking(bookingId));
                            }
                        } catch (error) {
                            Alert.alert('Error', error.message);
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
                    <Loading />
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
        backgroundColor: '#101944',
        height: '100%',
        padding: 20,
        paddingBottom: 50,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notAvail: {
        fontSize: 18
    }
})

export default UserBookings;
