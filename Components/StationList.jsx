import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('screen');

const StationList = ({ item, index, handleNavigation, handleBooking }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleNavigation(index)}>
                <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => handleBooking(index)}>
                    Booking
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#FFF',
        width: width - 20,
        minHeight: 120,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
    },
    name: { 
        color: 'black', 
        fontSize: 24, 
        fontWeight: 'bold', 
        margin: 8 
    },

    btnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent:"center"
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#101944',
        paddingVertical: 6,
        paddingHorizontal: 14,
        margin: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#101944',
        textAlign: 'center',
        fontSize: 14,
    },
});
export default StationList;
