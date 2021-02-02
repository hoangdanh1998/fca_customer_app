import * as Location from "expo-location";

import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";

import { KEY_GOOGLE_MAP } from "../../constance/constance";
import MapViewDirections from "react-native-maps-directions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userRegion, setUserRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })();
  }, []);
  console.log("userRegion", userRegion);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        // followsUserLocation={true} //work on ios only
        // onMapReady={getLocation}
        // onUserLocationChange={(coordinate) => {console.log(coordinate)}}
        showsUserLocation={true}
        showsScale
        showsCompass
        toolbarEnabled
        zoomEnabled
        rotateEnabled
        provider={PROVIDER_GOOGLE}
        region={userRegion}
      >
        {(userRegion) ?
          <MapViewDirections
            origin={{ latitude: userRegion.latitude, longitude: userRegion.longitude }}
            destination={{ latitude: 10.8155516, longitude: 106.6780962 }}
            apikey={KEY_GOOGLE_MAP}
            strokeWidth={4}
            strokeColor="blue"
          />
          : null
        }
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
