import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.765,
          longitude: 106.660,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />
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
    height: '100%',
    width: '100%',
    
  },
});

export default MapScreen;
