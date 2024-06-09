import { Image, StyleSheet } from 'react-native'

const LogoImage = () => {
    return (
        <Image style={styles.logo} source={require('../assets/EVRCS.jpeg')} />
    )
}
const styles = StyleSheet.create({
    logo: {
        height: 200,
        width:200,
        borderRadius: 30,
        marginBottom:20,
    },
});
export default LogoImage