import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingCard = ({ booking, onCancelBooking }) => (
    <View style={styles.bookingCard}>
        <Text style={styles.bookingName}>{booking.title}</Text>
        <Text style={styles.bookingDateTime}>
            Booking Date: {new Date(booking.startTime).toLocaleDateString()}{'\n'}
            Booking Time: {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {onCancelBooking &&
            <TouchableOpacity style={styles.cancelButton} onPress={() => onCancelBooking(booking.bookingId)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        }
    </View>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    bookingCard: {
        width: 300,
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        gap: 10,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookingName: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    bookingTime: {
        fontSize: 14,
        color: '#000',
    },
    bookingDateTime: {
        fontSize: 14,
        color: '#777',
    },
    cancelButton: {
        backgroundColor: '#ff4d4d',
        padding: 8,
        borderRadius: 8,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },

});

export default BookingCard;
