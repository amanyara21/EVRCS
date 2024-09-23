import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import BookingCard from '../Components/BookingCard';
import Loading from '../Components/Loading';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const allBookings = useSelector((state) => state.bookings.bookings);
    console.log(allBookings);

    useEffect(() => {
        filterPastBookings();
    }, [allBookings]);

    const filterPastBookings = () => {
        const today = new Date();
        const pastBookings = allBookings != null && allBookings.filter(booking => {
            const bookingDate = new Date(booking.startTime);
            return bookingDate < today;
        });

        setBookings(pastBookings);
        setLoading(false);
    };


    return (
        <>
            <Header title="Booking History" />
            <View style={styles.container}>
                {loading ? (
                    <Loading />
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
    );
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
});

export default BookingHistory;