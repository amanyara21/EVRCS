import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, Linking, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useAuth from '../Hooks/useAuth';
import Icon from 'react-native-vector-icons/FontAwesome6'
import StationList from '../Components/StationList';
import MapViewDirections from 'react-native-maps-directions';
import { MAPS_API_KEY, API_URL } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Alert from '../Components/Alert';


const ITEM_WIDTH = Dimensions.get('screen').width - 20;
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}


const HomeScreen = ({ navigation }) => {
  const [stations, setStations] = useState();
  const { location, locationLoaded } = useAuth();
  const [stationLocation, setStationLocation] = useState();
  const [destination, setDestination] = useState(null);
  const mapViewRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stations/`);
      const data = await response.json();
      setStations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    const sortedStations = location && stations && stations.sort((a, b) => {
      const distanceToA = calculateDistance(location.latitude, location.longitude, a.latitude, a.longitude);
      const distanceToB = calculateDistance(location.latitude, location.longitude, b.latitude, b.longitude);
      return distanceToA - distanceToB;
    });
  },[stations,location])

  


  

  const handleScroll = (event) => {
    setDestination(null)
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(xOffset / ITEM_WIDTH);
    const centerItem = stations[index];

    const coordinates = {
      latitude: Number(centerItem.latitude),
      longitude: Number(centerItem.longitude),
    };

    setStationLocation(coordinates);

    mapViewRef.current.animateToRegion({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };


  const handleNavigation = (index) => {
    const selectedLocation = stations[index];
    const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;
    setDestination(destination)
  }
  const handleOpenInGoogleMaps = () => {
    console.log('CLicked');
    const origin = `${location.latitude},${location.longitude}`
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    console.log(url);
    Linking.openURL(url);
  };


  const handleBooking = (index) => {
    let id = stations[index]._id
    let name = stations[index].name
    navigation.navigate('Booking', { id, name });
  }

  const renderMarkers = () => {
    return (
      <>
        <Marker
          draggable
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          description={`Lat: ${location.latitude}, Lng: ${location.longitude}`}
        />
        {stationLocation && <Marker
          coordinate={{
            latitude: stationLocation.latitude,
            longitude: stationLocation.longitude,
          }}
          title="Charging Station Location"
          description={`Lat: ${stationLocation.latitude}, Lng: ${stationLocation.longitude}`}

        >
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Icon name="charging-station" size={20} color="white" />
            </View>
          </View>
        </Marker>}
      </>
    );
  };

  return (
    <View >

      {locationLoaded ? (
        <View style={styles.main}>
       
          <View style={styles.container}>
            {/* <MapView
              ref={mapViewRef}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {renderMarkers()}
              {destination && (
                <MapViewDirections
                  origin={{ latitude: location.latitude, longitude: location.longitude }}
                  destination={destination}
                  apikey={MAPS_API_KEY}
                  strokeWidth={8}
                  strokeColor="#101944"
                />
              )}
            </MapView> */}

          </View>
          <View style={styles.list}>
            <FlatList
              ref={flatListRef}
              data={stations}
              horizontal
              pagingEnabled={true}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => (
                <StationList
                  item={item}
                  index={index}
                  handleNavigation={handleNavigation}
                  handleBooking={handleBooking}
                />
              )}
              keyExtractor={(item) => item._id}
              onScroll={handleScroll}
            />
            {destination && (
              <TouchableOpacity style={styles.btnsGoogle} onPress={handleOpenInGoogleMaps} >
                <Text style={styles.btnText} >See in Google Maps</Text>
              </TouchableOpacity>
            )}


          </View>
          <View style={styles.drawerIconBackground}>
            <TouchableOpacity style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
              <Icon name="bars" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : <ActivityIndicator style={styles.loader} size="large" color="blue" />}


    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
  },
  drawerIcon: {
    backgroundColor: '#101944',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerIconBackground: {
    zIndex: 3,
    position: 'absolute',
    top:20,
    left:20,
  },
  container: {
    zIndex: 1,
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  map: {
    flex: 1,
    zIndex:1,
  },
  list: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnsGoogle: {
    position: 'absolute',
    bottom: 140,
    right: 10,
    zIndex: 20,
    backgroundColor: '#101944',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,

  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }

});

export default HomeScreen;
