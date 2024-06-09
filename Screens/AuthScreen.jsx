import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Button from '../Components/Button';
import LogoImage from '../Components/LogoImage';


const AuthScreen = ({ navigation }) => {
  const onClickLogin = () => {
    navigation.navigate('Login')
  }
  const onClickSignUp = () => {
    navigation.navigate('Signup')
  }
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.buttonContainer}>
        <Button title="LOGIN" click={onClickLogin} />
        <Button title="SIGNUP" click={onClickSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#101944',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default AuthScreen;
