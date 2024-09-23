import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import useAuth from '../Hooks/useAuth';
import BookingCard from '../Components/BookingCard';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';

const ShowPaymentScreen = () => {
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

    const calculateTotalAmount = () => {
        return bookings.reduce((total, booking) => total + booking.amount, 0);
    };

    const handlePayment = () => {
        const totalAmount = calculateTotalAmount();
        Alert.alert('Payment', `Your total amount is $${totalAmount}. Proceed to payment?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Pay', onPress: () => console.log('Proceed to payment logic') }, // Add your payment logic here
        ]);
    };

    return (
        <>
            <Header title="Your Payments" />
            <View style={styles.container}>
                {loading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={bookings}
                        keyExtractor={(item) => item.bookingId.toString()}
                        renderItem={({ item }) => <BookingCard booking={item} price={true}/>}
                        ListEmptyComponent={!loading && <Text style={styles.notAvail}>No bookings available</Text>}
                        contentContainerStyle={styles.flatListContent}
                    />
                )}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total Amount: ₹{calculateTotalAmount()}</Text>
                    <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                        <Text style={styles.payButtonText}>Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101944',
        padding: 20,
        paddingBottom: 50,
        alignItems: 'center',
    },
    flatListContent: {
        paddingBottom: 80,
    },
    totalContainer: {
        flexDirection:'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:'space-around',
        alignItems:'center'
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    payButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#101944',
        borderRadius: 8,
    },
    payButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    notAvail: {
        fontSize: 18,
        color: '#ffffff',
    },
});

export default ShowPaymentScreen;
