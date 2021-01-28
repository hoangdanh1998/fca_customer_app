import * as Location from "expo-location";

import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useEffect, useState } from "react";

import { KEY_GOOGLE_MAP } from "../../constance/constance";
import MapViewDirections from "react-native-maps-directions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState({

    latitude: 10.8274174,
    longitude: 106.6793407 ,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        followsUserLocation={true}
        // onMapReady={_onMapReady}
        showsUserLocation
        showsScale
        showsCompass
        toolbarEnabled
        zoomEnabled
        rotateEnabled
        provider={PROVIDER_GOOGLE}
        region={initialRegion}
      >
        <MapViewDirections
          origin={{ latitude: 10.8274174, longitude: 106.6793407 }}
          destination={{ latitude: 10.8155516, longitude: 106.6780962 }}
          apikey={KEY_GOOGLE_MAP}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    top: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    width,
    height,
    position: "relative",
  },
});

export default MapScreen;
