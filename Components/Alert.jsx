import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const Alert = ({
    isVisible,
    onClose,
    onConfirm,
    title,
    message,
    showSecondButton,
    firstButtonText,
    secondButtonText
}) => {
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>{firstButtonText}</Text>
                        </TouchableOpacity>
                        {showSecondButton && (
                            <>
                            <View style={styles.divide}></View>
                            <TouchableOpacity style={styles.button} onPress={onConfirm}>
                                <Text style={styles.buttonText}>{secondButtonText}</Text>
                            </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        paddingTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height:50,
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'gray',
        borderTopWidth: 0.5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    divide:{
        height:50,
        width:0.5,
        backgroundColor:"gray"
    }
});

export default Alert;