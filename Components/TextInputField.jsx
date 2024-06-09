import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen')

const TextInputField = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#ccc"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    required={true}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: width-40,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    input: {
        padding: 5,
        color: 'white',
        width:width-40,
        flex:1
    },
});

export default TextInputField;
