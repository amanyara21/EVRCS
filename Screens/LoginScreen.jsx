import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import useAuth from '../Hooks/useAuth';
import LogoImage from '../Components/LogoImage';
import Button from '../Components/Button';
import Footer from '../Components/Footer';
import TextInputField from '../Components/TextInputField';

const LoginScreen = ({ navigation }) => {
  const { handleLogin, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    handleLogin(email, password);
  };
  const handleFooterClick = () => {
    navigation.navigate('Signup');
  };
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <LogoImage />
        <TextInputField
          label="Email Address"
          placeholder="Username@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" click={handleLoginPress} />
        <Footer title="Signup" click={handleFooterClick} />

        {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    backgroundColor: '#101944',
  },
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default LoginScreen;
