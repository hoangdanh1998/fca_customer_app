import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MapScreen = () => {

  const [valueMarginBottom, setValueMarginBottom] = useState(1);
  // const _onMapReady = () => setValueMarginBottom(0)

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1, paddingBottom: {valueMarginBottom}}}
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(granted => {
            alert(granted) // just to ensure that permissions were granted
          });
        }}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
        showUserLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.765,
          longitude: 106.66,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        
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
