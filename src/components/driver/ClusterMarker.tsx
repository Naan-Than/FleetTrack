import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

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

interface Props {
    cluster: Cluster;
    selectedDriver: Driver | null;
    onDriverPress: (driver: Driver) => void;
    driverIcon: any;
}

const ClusterMarker: React.FC<Props> = ({
    cluster,
    selectedDriver,
    onDriverPress,
    driverIcon,
}) => {
    if (cluster.count === 1) {
        const d = cluster.drivers[0];
        const isSelected = selectedDriver?.id === d.id;

        const statusColor =
            d.status === "active"
                ? "#4CAF50"
                : d.status === "idle"
                    ? "#FFC107"
                    : "#9E9E9E";

        return (
            <Marker
                key={d.id}
                coordinate={{ latitude: d.lat, longitude: d.long }}
                onPress={() => onDriverPress(d)}
            >
                <View style={styles.markerRoot}>
                    <Image
                        source={driverIcon}
                        style={isSelected ? styles.selectedDriverIcon : styles.driverIcon}
                    />

                    <Text
                        style={[
                            styles.statusBadge,
                            { backgroundColor: statusColor }
                        ]}
                    >
                        {d.status}
                    </Text>
                </View>
            </Marker>
        );
    }
    return (
        <Marker
            key={cluster.id}
            coordinate={{ latitude: cluster.lat, longitude: cluster.long }}
        >
            <View style={styles.clusterBox}>
                <Text style={styles.clusterText}>{cluster.count}</Text>
            </View>
        </Marker>
    );
};

export default ClusterMarker;

const styles = StyleSheet.create({
    markerRoot: {
        alignItems: "center",
    },
    driverIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    selectedDriverIcon: {
        width: 48,
        height: 48,
    },
    statusBadge: {
        color: "white",
        fontSize: 10,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 6,
        marginTop: -4,
    },
    clusterBox: {
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
});
