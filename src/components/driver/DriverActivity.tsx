import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

interface DriverActivityProps {
    selectedDriver: {
        id: number;
        status: string;
    };
    driverSpeed: number;
    driverHistory: { [key: number]: { lat: number; long: number }[] };
    onClose: () => void;
}

const DriverActivity: React.FC<DriverActivityProps> = ({
    selectedDriver,
    driverSpeed,
    driverHistory,
    onClose,
}) => {
    return (
        <View style={styles.sheetContainer}>

            <Text style={styles.sheetTitle}>Driver #{selectedDriver.id}</Text>

            <View style={styles.infoSection}>
                <Text style={styles.infoText}>Status: <Text style={styles.infoValue}>{selectedDriver.status}</Text></Text>
                <Text style={styles.infoText}>Speed: <Text style={styles.infoValue}>{driverSpeed} km/h</Text></Text>
            </View>

            <Text style={styles.sectionTitle}>History</Text>
            <FlatList
                data={driverHistory[selectedDriver.id]}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.locationCard}>
                        <View style={{  }} >
                            <Text style={styles.locationLabel}>Latitude</Text>
                            <Text style={styles.locationValue}>{item.lat.toFixed(6)}</Text>
                        </View>
                        <View style={{  }} >
                            <Text style={[styles.locationLabel, {  }]}>Longitude</Text>
                            <Text style={styles.locationValue}>{item.long.toFixed(6)}</Text>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    sheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 20,
        paddingTop:10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 25,
        maxHeight: "40%",
    },

    sheetTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        color: "#000",
    },

    infoSection: {
        backgroundColor: "#f7f7f7",
        padding: 12,
        borderRadius: 12,
        marginBottom: 6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    infoText: {
        fontSize: 15,
        color: "#555",
        marginBottom: 4,
    },

    infoValue: {
        fontWeight: "600",
        color: "#000",
    },

    sectionTitle: {
        marginTop: 0,
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
        marginBottom: 5,
    },

    locationCard: {
        backgroundColor: "#f2f4f7",
        padding: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    locationLabel: {
        fontSize: 13,
        color: "#666",
        fontWeight: "600",
    },

    locationValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },

    closeBtn: {
        marginTop: 10,
        backgroundColor: "#111",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    closeText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default DriverActivity;
