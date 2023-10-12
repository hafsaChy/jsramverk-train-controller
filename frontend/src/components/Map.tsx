import { RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';
import getCoordinates from "../models/KoordMaker";
import { Ionicons } from '@expo/vector-icons';
var train = require('./../assets/train.png')
var dancer = require('./../assets/dancing.png')



export default function Map( { stationDelays } ) {
  const [locationMarker, setLocationMarker] = useState(null);
  const [circleWalking, setcircleWalking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
      (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status !== 'granted') {
              setErrorMessage('Permission to access location was denied');
              return;
          }

          const currentLocation = await Location.getCurrentPositionAsync({});

          setLocationMarker(<Marker
              coordinate={{
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude
              }}
              title="Min plats"
              pinColor="blue"
              icon={dancer}
          />);
          })();
  }, []);

  const timeDelayCircle = (AdvertisedTime, EstimatedTime, centerCords) => {
    let date1 = new Date(AdvertisedTime);
    let date2 = new Date(EstimatedTime);
    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    };

    var diff = date2 - date1;
    var mm = Math.floor(diff / 1000 / 60);
    setcircleWalking(<Circle center={{ latitude: parseFloat(centerCords[1]), longitude: parseFloat(centerCords[0])}} radius={ mm*50 } />);

  };


  const listMarker = stationDelays.map((station, index) => {
    let f = getCoordinates(station.Geometry.WGS84);
    return <Marker key={index} coordinate={{
                    latitude: parseFloat(f[1]),
                    longitude: parseFloat(f[0]),
                  }}
                  title={ station.AdvertisedLocationName }
                  pinColor="red"
                  icon={train}
                  description = {station.AdvertisedTimeAtLocation.slice(11,19)+" " +station.EstimatedTimeAtLocation.slice(11,19) }
                  onPress={() => timeDelayCircle(station.AdvertisedTimeAtLocation, station.EstimatedTimeAtLocation, f)}

              />
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
            latitude: 59.334591,
            longitude: 15.063240,
            latitudeDelta: 8,
            longitudeDelta: 10,
        }}>
          {listMarker}
          {locationMarker}
          {circleWalking}
        </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
  },
  map: {
      ...StyleSheet.absoluteFillObject
  },
});
