import * as Location from "expo-location";

import { Button, Card, CardItem, Left, Right } from "native-base";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KEY_GOOGLE_MAP, MESSAGES } from "../../constants/index";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useEffect, useState } from "react";
import {useSelector} from 'react-redux'

import GoogleMatrix from "../map/google-matrix";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import OrderButton from "../../components/atoms/order-button/index";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const googleMapNavigation = (props) => {
  console.log("google map navigation props:", props);
  const [distanceTravel, setDistanceTravel] = useState(0);
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);

  const coffeCoord = useSelector(state => state.map.partnerLocation);
  const destinationCoord = useSelector(state => state.map.detailsGeometry); 
  console.log("partner location: ",coffeCoord );

  const startCoord = "10.8276193,106.6770863";
  // const coffeCoord = "10.8592975,106.7872838";
  // const destinationCoord = "10.8414899,106.8078577";

  const getDistance = (location2) => {
    const lat1 = location.coords.latitude;
    const lon1 = location.coords.longitude;
    const lat2 = location2.coords.latitude;
    const lon2 = location2.coords.longitude;

    const R = 6371e3;
    const o1 = (lat1 * Math.PI) / 180;
    const o2 = (lat2 * Math.PI) / 180;
    const deltaO = ((lat2 - lat1) * Math.PI) / 180;
    const deltaL = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaO / 2) * Math.sin(deltaO / 2) +
      Math.cos(o1) * Math.cos(o2) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2); //Haversine formula
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; //in metres

    setDistanceTravel(distanceTravel + d);
    setLocation(location2);
    console.log(`Distance: ${distanceTravel} `);
  };

  const openUrl = () => {
    const url = `https://www.google.com/maps/dir/${startCoord}/${coffeCoord}/${destinationCoord}`;
    return Linking.canOpenURL(url);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  const MapView = () => {
    return(
      <MapView
      style={styles.map}
      showsUserLocation={true}
      onUserLocationChange={async () => {
        getDistance(await Location.getCurrentPositionAsync({}));
      }}
      showsScale
      showsCompass
      toolbarEnabled
      zoomEnabled
      rotateEnabled
      provider={PROVIDER_GOOGLE}
      region={userRegion}
    ></MapView>
    );
  
  };
  return (
    <View
      style={{
        flex: 1,
        // alignItems: "center",
        height: "100%",
        // justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            // height: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          {MapView()}
        </View>
        <Button onPress={openUrl}>Click me</Button>
      </View>
      {/* <GoogleMatrix /> */}
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
export default googleMapNavigation;
