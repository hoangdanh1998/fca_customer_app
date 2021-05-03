import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from 'react-redux';
import { getOrderOnChange, setTrackingOrder } from "../../service/firebase/firebase-realtime";
import { getDistance } from "../../service/google-api/google-map-api";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';
const googleMapNavigation = () => {

  

  const partnerLocation = useSelector(state => state.map.partnerLocation);
  const destinationLocation = useSelector(state => state.map.destinationLocation);
  const createdOrder = useSelector(state => state.order.createdOrder);
  const KEY_GOOGLE_MAP = useSelector((state) => state.map.googleKey);

  const [originDistance2Partner, setOriginDistance2Partner] = useState(0);
  const [startLocation, setStartLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [totalTravel, setTotalTravel] = useState(0);
  // const [originLocation, setOriginLocation] = useState(null)
  const isAutoPrepare = useSelector(state => state.order.isAutoPrepare);
  const [listenedOrder, setListenedOrder] = useState();
  

  const startTrackingLocation = async () => {
    await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      TASK_FETCH_LOCATION
    );
    console.log('tracking started?', hasStarted);
  }

  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };
    config();
    startTrackingLocation();
  }, []);

  const calculateDistance = async (currentLocation) => {
    // const lat1 = startLocation?.coords?.latitude;
    // const lon1 = startLocation?.coords?.longitude;
    // const lat2 = currentLocation.coords.latitude;
    // const lon2 = currentLocation.coords.longitude;

    // const R = 6371e3;
    // const o1 = (lat1 * Math.PI) / 180;
    // const o2 = (lat2 * Math.PI) / 180;
    // const deltaO = ((lat2 - lat1) * Math.PI) / 180;
    // const deltaL = ((lon2 - lon1) * Math.PI) / 180;

    // const a =
    //   Math.sin(deltaO / 2) * Math.sin(deltaO / 2) +
    //   Math.cos(o1) * Math.cos(o2) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2); //Haversine formula
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const d = R * c; //in metres
    // const travel = +(totalTravel + d);
    // setTotalTravel(travel);

    if (isAutoPrepare) {
      const distance = await getDistance(currentLocation.coords, partnerLocation);
      setTrackingOrder(createdOrder.id, distance.duration.text, distance.distance.value);
    }
  };

  useEffect(() => {
    if (createdOrder) {
      getOrderOnChange(createdOrder.id, (order) => {
        setListenedOrder(order);
      });
    }
  }, []);

  TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    const [location] = locations;
    try {
      calculateDistance(location)
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setStartLocation(currentLocation);

      setUserRegion({
        latitude: +currentLocation.coords.latitude,
        longitude: +currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });


      const distance = await getDistance(currentLocation.coords, partnerLocation);
      setOriginDistance2Partner(distance.distance.value)
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
            try {
              calculateDistance(await Location.getCurrentPositionAsync({}));
            } catch (err) {
            }

          }
          }
          showsScale
          showsCompass
          toolbarEnabled
          zoomEnabled
          rotateEnabled
          provider={PROVIDER_GOOGLE}
          region={userRegion}
        >

          {startLocation && partnerLocation && destinationLocation ? (<MapViewDirections
            origin={{
              latitude: +startLocation?.coords?.latitude,
              longitude: +startLocation?.coords?.longitude,
            }}
            waypoints={[{
              latitude: +partnerLocation.latitude,
              longitude: +partnerLocation.longitude,
            },
              {
                latitude: +destinationLocation.latitude,
                longitude: +destinationLocation.longitude,
            }]}
            destination={{
              latitude: +destinationLocation.latitude,
              longitude: +destinationLocation.longitude,
            }}

            apikey={KEY_GOOGLE_MAP}
            strokeWidth={4}
            strokeColor="blue"
          />) : null}

          {destinationLocation ? (
            <Marker
              coordinate={{
                latitude: +destinationLocation.latitude,
                longitude: +destinationLocation.longitude,
              }}
            />
          ) : null}

          {partnerLocation ? (<Marker
            coordinate={{
              latitude: +partnerLocation.latitude,
              longitude: +partnerLocation.longitude,
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

