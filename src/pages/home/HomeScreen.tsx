import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ToastMessage } from '../../constants/TostMessages';
import { requestLocationPermission } from '../../util/Permission';

export default function HomeScreen(props: any) {
  const [vehicleStats, setVehicleStats] = useState({
    active: 0,
    idle: 0,
    offline: 0,
  });

  const generateRandomStats = () => {
    const total = 500;
    const active = Math.floor(Math.random() * 300) + 100; 
    const idle = Math.floor(Math.random() * (total - active - 50));
    const offline = total - active - idle; 

    setVehicleStats({ active, idle, offline });
  };

  useEffect(() => {
    generateRandomStats();

    const interval = setInterval(() => {
      generateRandomStats();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleTrackVehicles = async () => {
    const granted = await requestLocationPermission();

    if (!granted) {
      ToastMessage.Custom('error', 'Location permission is required to continue.');

      return;
    }

    props.navigation.navigate('VehicleTrackMap');
  };


  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="car-sport" size={40} color="#2563eb" />
          </View>
          <Text style={styles.title}>FleetTrack</Text>
          <Text style={styles.subtitle}>Smart Geo-Clustering System</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Real-Time Fleet Monitoring</Text>
          <Text style={styles.cardDescription}>
            Track your entire fleet in real-time with intelligent geo-clustering.
            Monitor vehicle locations, optimize routes, and manage your logistics
            with precision.
          </Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="location" size={30} color="#16a34a" />
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#e0e7ff' }]}>
                <Ionicons name="navigate" size={28} color="#4f46e5" />
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#fed7aa' }]}>
                <Ionicons name="analytics" size={28} color="#ea580c" />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={handleTrackVehicles}
          activeOpacity={0.8}
        >
          <Ionicons name="map" size={20} color="#ffffff" />
          <Text style={styles.trackButtonText}>Track Vehicles</Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
            </View>
            <Text style={styles.statNumber}>{vehicleStats.active}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="pause-circle" size={24} color="#f59e0b" />
            </View>
            <Text style={styles.statNumber}>{vehicleStats.idle}</Text>
            <Text style={styles.statLabel}>Idle</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="close-circle" size={24} color="#ef4444" />
            </View>
            <Text style={styles.statNumber}>{vehicleStats.offline}</Text>
            <Text style={styles.statLabel}>Offline</Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Vehicles: 500</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresContainer: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  totalContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
});