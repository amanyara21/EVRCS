import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Footer = ({ title, click }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={click} style={styles.footerText}>
                <Text style={styles.footerText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        marginTop: 30,
    },
    footerText: {
        color: '#fff',
        fontSize:16,
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
    },
});
export default Footer