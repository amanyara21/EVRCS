import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import Header from '../Components/Header';
import { API_URL } from "@env"
import { useDispatch } from 'react-redux';
import { addBooking } from '../redux/bookingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingScreen = ({ route }) => {
    const [token, setToken] = useState(null);
    const dispatch = useDispatch()
    const { name, id } = route.params;
    // All three for Pickers Visibility
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    // All three for setting Date/Time
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [vehicleNumber, setVehicleNumber] = useState('');

    // Will be used on api call
    const [isLoading, setIsLoading] = useState(true);
    const [availableTimeslots, setAvailableTimeslots] = useState([]);

    useEffect(()=>{
        getToken()
    },[])
    useEffect(() => {
        getAvailableTimeSlots();
    }, [date, isLoading])

    const onDismissDatePicker = () => {
        setShowDatePicker(false);
    };

    const onConfirmDatePicker = ({ date }) => {
        setDate(date);
        setShowDatePicker(false);
    };

    const onDismissTimePicker = () => {
        setShowStartTimePicker(false);
        setShowEndTimePicker(false);
    };

    const onConfirmTimePicker1 = ({ hours, minutes }) => {
        const selectedTime = new Date(date);
        selectedTime.setHours(hours);
        selectedTime.setMinutes(minutes);
        setStartTime(selectedTime);
        setShowStartTimePicker(false);
    };

    const onConfirmTimePicker2 = ({ hours, minutes }) => {
        const selectedTime = new Date(date);
        selectedTime.setHours(hours);
        selectedTime.setMinutes(minutes);
        setEndTime(selectedTime);
        setShowEndTimePicker(false);
    };

    const handleBooking = async () => {
        setIsLoading(true)
        if (!vehicleNumber || !startTime || !endTime) {
            Alert.alert('Error', 'Please enter all required fields');
            return;
        }

        const bookingDetails = {
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            vehicalNo: vehicleNumber,
        };

        try {
            const response = await fetch(`${API_URL}/api/stations/${id}/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify(bookingDetails),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(addBooking(data));
                console.log(data);
                Alert.alert('Success', 'Booking Successful');
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.msg || 'Booking Failed');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred');
        }finally{
            setIsLoading(false)
        }
    };


    const getAvailableTimeSlots = async () => {
        try {
            const response = await fetch(`${API_URL}/api/stations/${id}/availability/${date}`)
            const data = await response.json();
            if (!response.ok) {
                throw Error("server error")
            }
            setAvailableTimeslots(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(true)
        }
    }
    const getToken = async () => {
        const token = await AsyncStorage.getItem('jwtToken');
        setToken(token);
    }
    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}${amOrPm}`;
    };
    
    


    return (

        <ScrollView style={styles.scroll}>
            <Header title={name} />
            <View style={styles.fullScreen}>
                <View style={styles.date}>
                    <Text style={styles.label}>Vehicle Number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Vehicle Number'
                            placeholderTextColor='#ccc'
                            value={vehicleNumber}
                            onChangeText={setVehicleNumber}
                        />
                    </View>
                </View>
                <View style={styles.date}>
                    <Text style={styles.label}>Set Date</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.buttonText}>{date.toDateString()}</Text>
                        </TouchableOpacity>
                        <DatePickerModal
                            locale="en"
                            mode="single"
                            visible={showDatePicker}
                            onDismiss={onDismissDatePicker}
                            date={date}
                            onConfirm={onConfirmDatePicker}
                        />

                    </View>
                </View>
                <View style={styles.Time}>
                    <View style={styles.TimeBtn}>
                        <Text style={styles.label}>Set Start Time</Text>
                        <View>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setShowStartTimePicker(true)}>
                                <Text style={styles.buttonText}>{startTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>
                            <TimePickerModal
                                locale='en'
                                visible={showStartTimePicker}
                                onDismiss={onDismissTimePicker}
                                onConfirm={onConfirmTimePicker1}
                                hours={12}
                                minutes={14}
                            />

                        </View>
                    </View>
                    <View style={styles.TimeBtn}>
                        <Text style={styles.label}>Set End Time</Text>
                        <View >
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setShowEndTimePicker(true)}>
                                <Text style={styles.buttonText}>{endTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>
                            <TimePickerModal
                                visible={showEndTimePicker}
                                onDismiss={onDismissTimePicker}
                                onConfirm={onConfirmTimePicker2}
                                hours={12}
                                minutes={14}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleBooking}>
                    <Text style={styles.buttonText}>Book Slot</Text>
                </TouchableOpacity>


                <View style={styles.Availability}>
                    <Text style={styles.availText}>Available Time</Text>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <View style={styles.availtimeContainer}>
                            {availableTimeslots && availableTimeslots.map((timeslot, index) => (
                                <View key={index} style={styles.timeSlot}>
                                    <Text style={styles.timeSlotText}>
                                        {formatTime(timeslot.startTime)} - {formatTime(timeslot.endTime)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>

    )
};


const styles = StyleSheet.create({

    btn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    fullScreen: {
        backgroundColor: '#101944',
        paddingTop: 20,
        flex: 1,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    date: {
        width: 320,
        marginBottom: 20,
    },
    Time: {
        flexDirection: 'row',
        gap: 10,
        width: 320,
    },
    TimeBtn: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        padding: 0,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 2,
        color: 'white',
    },
    button: {
        width: 320,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20,
        shadowColor: '#e4ebff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1c1c1e',
    },
    Availability: {
        width: '100%',
        marginTop: 50,
        padding:0
    },
    availText: {
        fontSize: 20,
        color: 'white',
        textAlign:'center',
        fontWeight: 'bold',
    },
    availtimeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    timeSlot: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3498db',
        margin: 5,
        padding: 8,
        width: "46%",
        marginTop: 10,

    },
    timeSlotText: {
        color: '#3498db',
        textAlign: 'center',
        fontSize: 16,
    }

});

export default BookingScreen;