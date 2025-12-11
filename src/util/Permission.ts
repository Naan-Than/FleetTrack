import {
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import { promptForEnableLocationIfNeeded } from "react-native-android-location-enabler";

const openAppSettings = () => {
  Linking.openSettings();
};

export const checkIfLocationEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await DeviceInfo.isLocationEnabled();
    if (enabled) return true;

    if (Platform.OS === "android") {
      try {
        await promptForEnableLocationIfNeeded({
          title: "Location Services Disabled",
          message: "Please enable location to continue",
          positiveButtonText: "Enable",
          negativeButtonText: "Cancel",
        });
        return true;
      } catch {
        return false;
      }
    }

    Alert.alert(
      "Location Services Off",
      "Please turn on location services in Settings > Privacy & Security > Location Services",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: openAppSettings },
      ]
    );
    return false;
  } catch {
    return false;
  }
};

export const requestLocationAndNotificationPermission = async (): Promise<{
  locationGranted: boolean;
  notificationGranted: boolean;
}> => {
  let locationGranted = false;
  let notificationGranted = true;

  try {
    if (Platform.OS === "android") {
      const locationStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (locationStatus === PermissionsAndroid.RESULTS.GRANTED) {
        locationGranted = await checkIfLocationEnabled();
      } else if (locationStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          "Location Permission Required",
          "Location access is permanently denied. Please enable it in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openAppSettings },
          ]
        );
      }

      const androidVersion = await DeviceInfo.getApiLevel();
      if (androidVersion >= 33) {
        const notifStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        notificationGranted = notifStatus === PermissionsAndroid.RESULTS.GRANTED;

        if (notifStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            "Notifications Blocked",
            "Please enable notifications in Settings to receive updates.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: openAppSettings },
            ]
          );
        }
      }
    } 
    else {

      const locationStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (locationStatus === RESULTS.GRANTED || locationStatus === RESULTS.LIMITED) {
        locationGranted = await checkIfLocationEnabled();
      } else if (locationStatus === RESULTS.BLOCKED || locationStatus === RESULTS.DENIED) {
        Alert.alert(
          "Location Permission Required",
          "Please allow location access in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openAppSettings },
          ]
        );
      }

    }
  } catch (err) {
    console.warn("Permission request error:", err);
  }

  return { locationGranted, notificationGranted };
};

export const requestLocationPermission = async (): Promise<boolean> => {
  const { locationGranted } = await requestLocationAndNotificationPermission();
  return locationGranted;
};