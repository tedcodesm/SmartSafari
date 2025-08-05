import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const destination = {
    latitude: -1.1659,
    longitude: 36.785199,
  };

 const getDirections = async (startLoc, destinationLoc) => {
  const API_KEY = '';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (!json.routes || json.routes.length === 0) {
      console.warn('No routes found:', json);
      return;
    }

    const points = polyline.decode(json.routes[0].overview_polyline.points);
    const coords = points.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
    setRouteCoords(coords);
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
};


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });

      await getDirections(
        `${latitude},${longitude}`,
        `${destination.latitude},${destination.longitude}`
      );
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker coordinate={location} title="You" />
      <Marker coordinate={destination} title="Destination" />
      <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="blue" />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
