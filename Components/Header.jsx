import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";

const Header = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.btn}
                >
                    <Ionicons name="chevron-back-outline" size={34} color="#101944" />
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:8,
        flexDirection:'row',
        alignItems:'center',
    },
    btn:{
        width:60,
        height:50,
        padding:8,
        marginLeft:10,
    },
    text:{
        flex:1,
        fontSize:24,
        color:'#101944',
        fontWeight:'bold',
        textAlign:'center',
        marginLeft:-18,
    }
})

export default Header;