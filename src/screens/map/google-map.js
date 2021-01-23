import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 10.765,
    longitude: 106.66,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


  const _onMapReady = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== `granted`) {
      console.log(`Permisson Denied`);
    }
    const location = await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.High });
    setInitialRegion({
      ...initialRegion,
      "latitude": location.coords.latitude,
      "longitude": location.coords.longitude
    });
  }, [initialRegion]);
  console.log(initialRegion);
  // useEffect(() => {
  //   _onMapReady();
  // }, [_onMapReady]);

  return (
    <View style={styles.container}>
      <MapView
        followsUserLocation={true}
        onMapReady={_onMapReady}
        showsUserLocation
        showsScale
        showsCompass
        toolbarEnabled
        zoomEnabled
        rotateEnabled
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      ></MapView>
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
  map: {
    height: "100%",
    width: "100%",
  },
});

export default MapScreen;
