import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('screen')

const Button = ({ title, click, icon}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={click}>
            <Text style={styles.buttonText}>{title}</Text>
            {icon && <Icon name={icon} size={24}/>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        padding: 12,
        width: width - 40,
        borderRadius: width / 2,
        shadowColor: '#fff',
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#101944',
        textTransform: 'uppercase',
    },
});


export default Button