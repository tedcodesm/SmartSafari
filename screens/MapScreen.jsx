import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';
import axios from "axios";
import { API, BASE_URL } from "../config/ip"; // make sure BASE_URL points to your backend

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // Destination (fixed point, e.g., school)
  const destination = {
    latitude: -1.1659,
    longitude: 36.785199,
  };

  // Fetch directions between two points
  const getDirections = async (startLoc, destinationLoc) => {
    const API_KEY = API; // Google Maps API Key
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (!json.routes || json.routes.length === 0) {
        console.warn('No routes found:', json);
        return;
      }

      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const coords = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  // Get user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setUserLocation({ latitude, longitude });

      // Draw route from user -> destination
      await getDirections(
        `${latitude},${longitude}`,
        `${destination.latitude},${destination.longitude}`
      );
    })();
  }, []);

  // Poll driver’s location from backend every 5s
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/buses/drivers/68a2ec5f7f4071999c046c57/destination`);
        // replace KBS122e with actual plateNumber param
        console.log("found location data",res.data)
        console.log("latitude data",res.data.destination.latitude)
        console.log("longitude data",res.data.destination.longitude)
        if (res.data?.destination) {
          setDriverLocation({
            latitude: res.data.destination.latitude, // [lng, lat]
            longitude: res.data.destination.longitude,
          });
        }
      } catch (err) {
        console.error("Error fetching driver location:", err.message);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!userLocation) {
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
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* User Marker */}
      <Marker coordinate={userLocation} title="You" pinColor="blue" />

      {/* Driver Marker */}
      {driverLocation && (
        <Marker coordinate={driverLocation} title="Driver" pinColor="green" />
      )}

      {/* Destination Marker */}
      <Marker coordinate={destination} title="Destination" pinColor="red" />

      {/* Route */}
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
