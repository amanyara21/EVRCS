import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import useAuth from '../Hooks/useAuth';
import Button from '../Components/Button';
import LogoImage from '../Components/LogoImage';
import Footer from '../Components/Footer';
import TextInputField from '../Components/TextInputField';
import {API_URL} from '@env';


const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const {handleSignup, error} = useAuth();

  const handleFooterClick = () => {
    navigation.navigate('Login');
  };

  const handleSignupClick = async () => {
    if (!otpRequested) {
      sendOTP(email)
      setOtpRequested(true);
    } else {
      handleSignup(name, email, password, otp);
    }
  };
  const sendOTP=async(email)=>{
    try {
      const response = await fetch(`${API_URL}/api/send-otp`, {
        method: "POST",
        "headers":{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email: email.toLowerCase().trim()})
      })

    } catch (error) {
      //console.log(error)
    }
  }
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <LogoImage />
        <TextInputField
          label="Full Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        {otpRequested && (
          <TextInputField
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
        )}

        <Button title={otpRequested ? "Verify OTP" : "Signup"} click={handleSignupClick} />

        {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}

        <Footer title="Login" click={handleFooterClick} />
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

  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignupScreen;
