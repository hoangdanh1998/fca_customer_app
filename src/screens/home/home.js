import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const HomeScreen = () => {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 10.765,
        longitude: 106.66,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })


    const _onMapReady = useCallback(async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log({ status })
        if (status !== `granted`) {
            console.log(`Permission Denied`);
        }
        const location = await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.High });
        setInitialRegion({
            ...initialRegion,
            "latitude": location.coords.latitude,
            "longitude": location.coords.longitude
        });
    });

    console.log(initialRegion);

    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
