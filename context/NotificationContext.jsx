import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Register device and get push token
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Listener: when notification is received
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notif) => {
        setNotification(notif);
      }
    );

    // Listener: when user taps a notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "User tapped notification:",
          response.notification.request.content.data
        );
        console.log(
          "Notification tapped:",
          response.notification.request.content
        );
        const data = response.notification.request.content.data;
        if (data?.screen) {
          navigate(data.screen, data.params || {});
        }
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  // Function to trigger local notification
  const schedulePushNotification = async (title, body, data = {}) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: { seconds: 2 }, // after 2s
    });
  };

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, schedulePushNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

// Helper: Ask for permission + get token
async function registerForPushNotificationsAsync() {
  let token = null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission for notifications not granted!");
      return null;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) throw new Error("Missing EAS projectId in app config");

      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      token = pushToken.data;
      console.log("Expo Push Token:", token);
    } catch (e) {
      console.error("Error getting push token", e);
    }
  } else {
    Alert.alert("Must use physical device for push notifications");
  }

  return token;
}
