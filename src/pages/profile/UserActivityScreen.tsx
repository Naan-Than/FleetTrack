import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { clearUserLocation, setUserLocation } from '../../store/slice/locationSlice';

const UserActivityScreen = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state: any) => state.location.userLocation);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setUserLocation({
            lat: latitude,
            long: longitude,
            timestamp: Date.now(),
          })
        );
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        Alert.alert('Error', 'Unable to get your location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleClearLocation = () => {
    dispatch(clearUserLocation());
  };

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.lat,
            longitude: userLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: userLocation.lat,
            longitude: userLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.lat,
              longitude: userLocation.long,
            }}
            title="Your Location"
            description={`Lat: ${userLocation.lat.toFixed(6)}, Long: ${userLocation.long.toFixed(6)}`}
          />
        </MapView>
      ) : (
        <View style={styles.noLocationContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Text style={styles.noLocationText}>No location available</Text>
          )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.refreshButton]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Getting Location...' : 'Refresh Location'}
          </Text>
        </TouchableOpacity>

        {userLocation && (
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClearLocation}
          >
            <Text style={styles.buttonText}>Clear Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {userLocation && userLocation.timestamp && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Last updated: {new Date(userLocation.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  noLocationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noLocationText: {
    fontSize: 18,
    color: '#666',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default UserActivityScreen;