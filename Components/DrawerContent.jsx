import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';
import useAuth from '../Hooks/useAuth';

const DrawerContent = ({ navigation }) => {
  const {user, handleLogOut}=useAuth();
  const handleBookingPress=()=>{
    navigation.navigate('UserBookings')
  }  
  const handleBookingHistoryPress=()=>{
    navigation.navigate('BookingHistory')
  }  
  
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: `https://ui-avatars.com/api/?name=${user.name}&background=fff&color=101944` }} style={styles.avatar} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>Name:</Text>
          <Text style={styles.emailText}>{user.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>Email:</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
        
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleBookingPress}
      >
        <Text style={styles.buttonText}>Bookings</Text>
        <Icon name="arrow-right" size={16} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleBookingHistoryPress}
      >
        <Text style={styles.buttonText}>Booking History</Text>
        <Icon name="arrow-right" size={16} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, {justifyContent:'center'}]}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101944',
    borderColor: 'white',
  },
  avatarContainer: {
    borderColor: 'white',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  emailText: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: "80%",
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight:"bold",
    marginRight: 10,
    color:'#1c1c1e',
  },
  emailContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DrawerContent;

