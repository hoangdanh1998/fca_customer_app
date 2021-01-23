import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const MapScreen = (props) => {
  const prop = {
    cafes: [
      {
        id: '1',
        name: 'Store 1',
        address: {
          latitude: 10.7600861,
          longitude: 106.6638317,
        }
      },
      {
        id: '2',
        name: 'Store 2',
        address: {
          latitude: 10.7694479,
          longitude: 106.6644155,
        }
      },
    ]
  }

  const [initialRegion, setInitialRegion] = useState({
    latitude: 10.765,
    longitude: 106.66,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0321,
  })


  const _onMapReady = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== `granted`) {
      console.log(`Permission Denied`);
    }
    const location = await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.High });
    // setInitialRegion({
    //   ...initialRegion,
    //   "latitude": location.coords.latitude,
    //   "longitude": location.coords.longitude
    // });
  });
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={initialRegion}
        onMapReady={_onMapReady}
        zoomEnabled
        rotateEnabled
        showsUserLocation
        style={styles.map}
        showsMyLocationButton
      >
        {prop.cafes?.map((cafe) => (
          <Marker
            coordinate={{
              latitude: cafe.address.latitude,
              longitude: cafe.address.longitude,
            }}
            key={cafe.id}
            onPress={(coordinate, point) => { }}
          >
            <Callout>
              <View>
                <Text>{cafe.name + ' hihi'}</Text>
              </View>
            </Callout>
          </Marker>))
        }

      </MapView>
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
