import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,

  View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from 'react-redux';
import { KEY_GOOGLE_MAP } from "../../constants/index";
import { setTrackingOrder } from '../../service/firebase/firebase-realtime';



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const googleMapNavigation = () => {

  const [distanceTravel, setDistanceTravel] = useState(0);
  const [originDistance2Partner, setOriginDistance2Partner] = useState(0);
  const [location, setLocation] = useState(null);
  // const [originLocation, setOriginLocation] = useState(null)
  const [userRegion, setUserRegion] = useState(null);

  const partnerLocation = useSelector(state => state.map.partnerLocation);
  const destinationCoord = useSelector(state => state.map.detailsGeometry);
  const createdOrder = useSelector(state => state.order.createdOrder);

  console.log('partnerLocation: ' + partnerLocation.latitude + ',' + partnerLocation.longitude)
  console.log('destination: ' + destinationCoord.latitude + ',' + destinationCoord.longitude)
  
  const getDistance = async (currentLocation) => {
    const lat1 = location.coords.latitude;
    const lon1 = location.coords.longitude;
    const lat2 = currentLocation.coords.latitude;
    const lon2 = currentLocation.coords.longitude;

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
    setLocation(currentLocation);
    if (distanceTravel > originDistance2Partner / 10) {
      await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destinations=${partnerLocation.latitude},${partnerLocation.longitude}&key=${KEY_GOOGLE_MAP}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json, text/ plain, */*',
            "Content-Type": "application/json",
          },
        }
      ).then((response) => { console.log({ response }); return response.json() })
        .then((responseJson) => {
          setTrackingOrder(createdOrder.id, responseJson.rows[0].elements[0].duration.text)
        })
    }

    setUserRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0822,
      longitudeDelta: 0.05,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&destinations=${partnerLocation.latitude},${partnerLocation.longitude}&key=${KEY_GOOGLE_MAP}`,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json, text/ plain, */*',
            "Content-Type": "application/json",
          },
        }
      ).then((response) => { console.log({ response }); return response.json() })
        .then((responseJson) => {
          setOriginDistance2Partner(responseJson.rows[0].elements[0].distance.value)
        })

      setUserRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0822,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

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
        >

          {location ? (<MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            waypoints={[{
              latitude: partnerLocation.latitude,
              longitude: partnerLocation.longitude,
            },
              {
                latitude: destinationCoord.latitude,
                longitude: destinationCoord.longitude,
            }]}
            destination={{
              latitude: destinationCoord.latitude,
              longitude: destinationCoord.longitude,
            }}

            apikey={KEY_GOOGLE_MAP}
            strokeWidth={4}
            strokeColor="blue"
          />) : null}

          {destinationCoord ? (
            <Marker
              coordinate={{
                latitude: destinationCoord.latitude,
                longitude: destinationCoord.longitude,
              }}
            />

          ) : null}
          {partnerLocation ? (<Marker
            coordinate={{
              latitude: partnerLocation.latitude,
              longitude: partnerLocation.longitude,
            }}
          />) : null}
        </MapView>
      </View>
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

