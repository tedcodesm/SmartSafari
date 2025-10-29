import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Image, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";
import axios from "axios";
import { API, BASE_URL } from "../config/ip";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MapScreen({ route }) {
  const driverId = route?.params?.driverId || null;
  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [socket, setSocket] = useState(null);

  const destination = {
    latitude: -1.1659,
    longitude: 36.785199,
  };

  const getDirections = async (startLoc, destinationLoc) => {
    const API_KEY = API;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (!json.routes || json.routes.length === 0) {
        console.warn("No routes found:", json);
        return;
      }

      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const coords = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  // Get user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setUserLocation({ latitude, longitude });

      await getDirections(
        `${latitude},${longitude}`,
        `${destination.latitude},${destination.longitude}`
      );
    })();
  }, []);

  // Initialize Socket.IO and fetch initial location
  useEffect(() => {
    if (!driverId) {
      console.log("No driver ID provided");
      return;
    }

    console.log("Driver ID:", driverId);

    const fetchInitialBusData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/buses/drivers/${driverId}/location`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("API response:", res.data);
        if (res.data?.plateNumber) {
          const socketInstance = io(BASE_URL, {
            auth: { token },
          });
          setSocket(socketInstance);

          socketInstance.on("connect", () => {
            console.log("Socket connected successfully");
            socketInstance.emit("joinBusRoom", res.data.plateNumber);
            console.log("Joined room: bus:" + res.data.plateNumber);
          });
          socketInstance.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
          });
          socketInstance.on("locationUpdate", (data) => {
            console.log("Received socket location update:", data);
            if (data.currentLocation?.coordinates) {
              setDriverLocation({
                latitude: data.currentLocation.coordinates[1],
                longitude: data.currentLocation.coordinates[0],
              });
            }
          });
          socketInstance.on("error", (error) => {
            console.error("Socket error:", error.message);
          });
        }
        if (res.data?.currentLocation) {
          setDriverLocation({
            latitude: res.data.currentLocation.latitude,
            longitude: res.data.currentLocation.longitude,
          });
        } else {
          console.log("No current location available for driver");
        }
      } catch (err) {
        console.error("Error fetching initial bus data:", err.message);
      }
    };

    fetchInitialBusData();

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [driverId]);

  useEffect(() => {
    console.log("Driver location state:", driverLocation);
  }, [driverLocation]);

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!driverId) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No driver ID provided</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      provider="google"
      region={{
        latitude: driverLocation?.latitude || userLocation.latitude,
        longitude: driverLocation?.longitude || userLocation.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      key={`${driverLocation?.latitude || userLocation.latitude}-${driverLocation?.longitude || userLocation.longitude}`}
    >
      <Marker coordinate={userLocation} title="You" pinColor="blue" />
      {driverLocation &&
        driverLocation.latitude !== 0 &&
        driverLocation.longitude !== 0 && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            anchor={{ x: 0.5, y: 0.5 }}
            onLoad={() =>
              console.log("Driver marker rendered:", driverLocation)
            }
          >
   <Image
          source={require("../assets/bus.png")}
  style={{ width: 40, height: 40, backgroundColor: "" }}
  resizeMode="cover"
  onLoad={(event) => console.log("Image loaded:", event.nativeEvent.source)}
  onError={(error) => console.log("Image load error:", error.nativeEvent)}
/>
          </Marker>
        )}
      <Marker coordinate={destination} title="Destination" pinColor="red" />
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
    justifyContent: "center",
    alignItems: "center",
  },
});
