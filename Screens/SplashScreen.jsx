import { View, StyleSheet } from 'react-native'

import LogoImage from '../Components/LogoImage'
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LogoImage />
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
});


export default SplashScreen