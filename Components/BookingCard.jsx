import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingCard = ({ booking, onCancelBooking, price }) => {
    console.log(booking);
    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}${amOrPm}`;
    };
    return(
    <View style={styles.bookingCard}>
        <View style={styles.bookingInfo}>
            <Text style={styles.bookingName}>{booking.stationId.name}</Text>
            <Text style={styles.bookingDateTime}>
                Date: {new Date(booking.startTime).toLocaleDateString()}
            </Text>
            <Text style={styles.bookingDateTime}>
                Time: {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Text>
        </View>
        {onCancelBooking &&
            <TouchableOpacity style={styles.cancelButton} onPress={() => onCancelBooking(booking.bookingId)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        }
        {price &&
            <Text style={styles.bookingName}>₹{booking.amount}</Text>
        }
    </View>
    )
};

const styles = StyleSheet.create({
    bookingCard: {
        minWidth: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    bookingInfo: {
        flex: 1,
        paddingRight: 16,
    },
    bookingName: {
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
        marginBottom: 8,
    },
    bookingDateTime: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    cancelButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default BookingCard;
