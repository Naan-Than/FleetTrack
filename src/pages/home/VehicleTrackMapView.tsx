import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, NativeModules } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import polyline from "@mapbox/polyline";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { placeDirectionsAPI } from "../../services/map.service";
import DriverActivity from "../../components/driver/DriverActivity";
import OfflineBadge from "../../components/common/OfflineBadge";
import { useMockDriverSocket } from "../../hooks/useMockDriverSocket";
import ClusterMarker from "../../components/driver/ClusterMarker";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { setLastKnownDrivers } from "../../store/slice/driverSlice";



const { height } = Dimensions.get('window');
const BOTTOM_SHEET_MIN_HEIGHT = 160;
const BOTTOM_SHEET_MAX_HEIGHT = 300;

interface Driver {
    id: number;
    lat: number;
    long: number;
    destLat: number;
    destLong: number;
    status: string;
}

interface Cluster {
    id: string;
    lat: number;
    long: number;
    count: number;
    drivers: Driver[];
}

const KOCHI_BOUNDS = {
    minLat: 9.85,
    maxLat: 10.05,
    minLong: 76.20,
    maxLong: 76.35,
};

const VehicleTrackMapView = ({ navigation }: any) => {

    const mapRef = useRef<MapView>(null);
    const dispatch = useDispatch();


    const KOCHI = { latitude: 9.9312, longitude: 76.2673 };

    const [isOnline, setIsOnline] = useState(true)
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [clusters, setClusters] = useState<Cluster[]>([]);
    const [routeCoords, setRouteCoords] = useState<any[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [driverSpeed, setDriverSpeed] = useState(0);
    const [driverHistory, setDriverHistory] = useState<{ [key: number]: any[] }>({});
    const [showSheet, setShowSheet] = useState(false);
    const [mapRegion, setMapRegion] = useState({
        latitude: KOCHI.latitude,
        longitude: KOCHI.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    });

    const lastKnownDrivers = useSelector((state: any) => state.drivers.lastKnownDrivers);
    const bottomSheetHeight = useRef(new Animated.Value(BOTTOM_SHEET_MIN_HEIGHT)).current;
    const [isExpanded, setIsExpanded] = useState(false);

    const driverIcon = require("../../assets/Images/driver.png");
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected === true);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        generateDrivers();
    }, []);

    useEffect(() => {
        if (!isOnline && lastKnownDrivers.length > 0) {
            setDrivers(lastKnownDrivers);
        }
    }, [isOnline]);

    useEffect(() => {
    if (isOnline) {
        console.log("Starting background location service...");
        NativeModules.LocationServiceModule.start();
    }
}, [isOnline]);


    useMockDriverSocket(drivers, isOnline, (updatedDrivers: Driver[]) => {
        if (isOnline) {
            setDrivers(updatedDrivers);
            dispatch(setLastKnownDrivers(updatedDrivers));
        }

        // setDrivers(updatedDrivers);
        if (!isOnline) return;
        updatedDrivers.forEach((d) => {
            setDriverHistory((prevHist) => {
                const hist = prevHist[d.id] || [];
                return {
                    ...prevHist,
                    [d.id]: [...hist, { lat: d.lat, long: d.long }].slice(-10),
                };
            });
        });
    });

    useEffect(() => {
        if (drivers.length > 0) {
            clusterDrivers(mapRegion.latitudeDelta);
        }
    }, [drivers, mapRegion]);
    const isPointOnLand = (lat: number, long: number): boolean => {
        if (long < 76.24) {
            return lat > 9.90 && lat < 10.00;
        }
        return (
            lat >= KOCHI_BOUNDS.minLat &&
            lat <= KOCHI_BOUNDS.maxLat &&
            long >= KOCHI_BOUNDS.minLong &&
            long <= KOCHI_BOUNDS.maxLong
        );
    };

    const generateRandomLandPoint = () => {
        let lat, long, attempts = 0;
        do {
            lat = KOCHI.latitude + (Math.random() - 0.5) * 0.15;
            long = KOCHI.longitude + (Math.random() - 0.3) * 0.12;
            attempts++;
        } while (!isPointOnLand(lat, long) && attempts < 50);

        if (!isPointOnLand(lat, long)) {
            lat = KOCHI.latitude + (Math.random() - 0.5) * 0.08;
            long = KOCHI.longitude + Math.random() * 0.08;
        }
        return { lat, long };
    };
    const generateDrivers = () => {
        const list: Driver[] = [];
        const statuses = ["active", "idle", "offline"];

        for (let i = 0; i < 500; i++) {
            const start = generateRandomLandPoint();
            const dest = generateRandomLandPoint();

            list.push({
                id: i + 1,
                lat: start.lat,
                long: start.long,
                destLat: dest.lat,
                destLong: dest.long,
                status: statuses[Math.floor(Math.random() * statuses.length)],
            });
        }

        setDrivers(list);
    };

    const clusterDrivers = (latitudeDelta: number) => {
        const radius = latitudeDelta * 0.15;

        if (latitudeDelta < 0.02) {
            setClusters(
                drivers.map((d) => ({
                    id: `cluster-${d.id}`,
                    lat: d.lat,
                    long: d.long,
                    count: 1,
                    drivers: [d],
                }))
            );
            return;
        }

        const clusters: Cluster[] = [];
        const visited = new Set<number>();

        drivers.forEach((driver) => {
            if (visited.has(driver.id)) return;

            const near = drivers.filter((d) => {
                if (visited.has(d.id)) return false;
                const dist = Math.sqrt(Math.pow(driver.lat - d.lat, 2) + Math.pow(driver.long - d.long, 2));
                return dist < radius;
            });

            near.forEach((d) => visited.add(d.id));

            const avgLat = near.reduce((s, x) => s + x.lat, 0) / near.length;
            const avgLong = near.reduce((s, x) => s + x.long, 0) / near.length;

            clusters.push({
                id: `cluster-${driver.id}`,
                lat: avgLat,
                long: avgLong,
                count: near.length,
                drivers: near,
            });
        });

        setClusters(clusters);
    };

    const fetchRoute = async (driver: Driver) => {
        try {
            const res = await placeDirectionsAPI(
                { lat: driver.lat, long: driver.long },
                { lat: driver.destLat, long: driver.destLong }
            );

            const points = polyline.decode(res.data.routes[0].overview_polyline.points);
            const coords = points.map((p) => ({ latitude: p[0], longitude: p[1] }));

            setRouteCoords(coords);

            if (mapRef.current && coords.length > 0) {
                mapRef.current.fitToCoordinates(coords, {
                    edgePadding: { top: 100, right: 100, bottom: 350, left: 100 },
                    animated: true,
                });
            }
        } catch {
            setRouteCoords([
                { latitude: driver.lat, longitude: driver.long },
                { latitude: driver.destLat, longitude: driver.destLong },
            ]);
        }
    };

    const onDriverPress = (driver: Driver) => {
        setSelectedDriver(driver);
        fetchRoute(driver);
        setDriverSpeed(parseFloat((Math.random() * 30 + 20).toFixed(1)));
        setShowSheet(true);
    };

    const onRegionChangeComplete = (region: any) => setMapRegion(region);

    const filteredClusters = selectedDriver
        ? clusters.filter((c) =>
            c.count === 1 ? c.drivers[0].id === selectedDriver.id : true
        )
        : clusters;

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={mapRegion}
                onRegionChangeComplete={onRegionChangeComplete}
            >

                {routeCoords.length > 0 && (
                    <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#1E90FF" />
                )}

                {selectedDriver && (
                    <Marker
                        coordinate={{
                            latitude: selectedDriver.destLat,
                            longitude: selectedDriver.destLong,
                        }}
                    >
                        <View style={styles.destinationMarker}>
                            <View style={styles.destinationPin} />
                        </View>
                    </Marker>
                )}

                {filteredClusters.map((c) => (
                    <ClusterMarker
                        key={c.id}
                        cluster={c}
                        selectedDriver={selectedDriver}
                        onDriverPress={onDriverPress}
                        driverIcon={driverIcon}
                    />
                ))}

            </MapView>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#1f2937" />
            </TouchableOpacity>

            <View style={styles.offlineBadgeBox}>
                <OfflineBadge />
            </View>

            {showSheet && selectedDriver && (
                <DriverActivity
                    selectedDriver={selectedDriver}
                    driverSpeed={driverSpeed}
                    driverHistory={driverHistory}
                    onClose={() => {
                        setShowSheet(false);
                        setRouteCoords([]);
                        setSelectedDriver(null);
                    }}
                />
            )}
        </View>
    );
};

export default VehicleTrackMapView;

const styles = StyleSheet.create({
    markerRoot: {
        alignItems: "center",
    },
    driverIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    selectedDriverIcon: {
        width: 48,
        height: 48,
    },
    cluster: {
        backgroundColor: "#1565C0",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
        elevation: 5,
    },
    clusterText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    destinationMarker: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    destinationPin: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#FF4444",
        borderWidth: 3,
        borderColor: "#fff",
    },

    backButton: {
        position: "absolute",
        top: 26,
        left: 16,
        width: 38,
        height: 26,
        borderRadius: 22,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    offlineBadgeBox: {
        position: "absolute",
        top: 28,
        right: 16,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },

    bottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 20,
    },
    handleContainer: {
        alignItems: "center",
        paddingVertical: 12,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: "#d1d5db",
        borderRadius: 2,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 8,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    statIconContainer: {
        marginBottom: 8,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: "500",
    },

    // Expanded Content
    expandedContent: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },
    expandedTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: 12,
    },
    expandedStats: {
        gap: 8,
    },
    expandedStatRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    expandedStatLabel: {
        fontSize: 14,
        color: "#6b7280",
    },
    expandedStatValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1f2937",
    },
});