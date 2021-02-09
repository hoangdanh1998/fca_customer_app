import * as Location from "expo-location";

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useEffect, useState } from "react";

import GoogleMatrix from "../map/google-matrix";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KEY_GOOGLE_MAP } from "../../constants/index";
import MapViewDirections from "react-native-maps-directions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const MapScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [detailsGeometry, setDetailsGeometry] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);
  const [directionReturn, setDirectionReturn] = useState(null);
  const [storeSuggestion, setStoreSuggestion] = useState(null);

  const getSuggestionStores = (plainText) => {
    fetch("https://api-fca.xyz/api/partner/suggestion", {
      method: "POST",
      body: JSON.stringify(plainText),
    })
      .then((response) => response.json())
      .then((suggestedStores) => {
        console.log(suggestedStores);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDirectionApi = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=${detailsGeometry.latitude},${detailsGeometry.longitude}&key=${KEY_GOOGLE_MAP}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "OK") {
          // console.log(responseJson.rows[0].elements[0].distance.text)
          // console.log("DiretionAPI");
          //console.log(responseJson.routes[0].legs[0].steps);
          getSuggestionStores(responseJson.routes[0].legs[0].steps);
          // getSuggestionStores(JSON.stringify(responseJson.routes.legs.steps));
          // setDirectionReturn(JSON.stringify(responseJson.routes.legs.steps));
        } else {
          console.log("Not OK");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openSearchModal = () => {
    // const showToast = () => {
    //   ToastAndroid.show(`${initialRegion.description} + ${initialRegion.latitude}`, ToastAndroid.SHORT);
    // };
    return (
      <View>
        <GooglePlacesAutocomplete
          // style={styles.searchBar}
          placeholder="Search location"
          minLength={2}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
            // console.log(data,details.description);
            // console.log(data.description);
            // console.log(details.geometry.location.lat);
            // console.log(details.geometry.location.lng);
            // setInitialRegion({
            //   description: details.description,
            //   latitude:details.geometry.location.lat,
            //   longitude: details.geometry.location.lng,
            // })
            setDetailsGeometry({
              description: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            // getDirectionApi();
          }}
          query={{
            key: KEY_GOOGLE_MAP,
            components: "country:vn", //limit country
          }}
          // currentLocation={true}
          // currentLocationLabel="Current location"
          styles={{
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              top: 15,
              width: screenWidth - 10,
              borderWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
              borderWidth: 0,
            },
            listView: {
              backgroundColor: "rgba(192,192,192,0.9)",
              top: 23,
            },
          }}
        />
      </View>
    );
  };
  const mapView = () => {
    // console.log("userRegion", userRegion);
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
          {userRegion && detailsGeometry ? (
            <MapViewDirections
              origin={{
                latitude: userRegion.latitude,
                longitude: userRegion.longitude,
              }}
              destination={{
                latitude: detailsGeometry.latitude,
                longitude: detailsGeometry.longitude,
              }}
              apikey={KEY_GOOGLE_MAP}
              strokeWidth={4}
              strokeColor="blue"
              onReady={() => getDirectionApi()}
              // onReady={result => {
              //   setDirectionReturn(result);
              //   console.log(result.routes);
              // }}
            />
          ) : null}
          {detailsGeometry ? (
            <Marker
              coordinate={{
                latitude: detailsGeometry.latitude,
                longitude: detailsGeometry.longitude,
              }}
            />
          ) : null}
          {/* {restaurantData.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.location.latitude,
                longitude: restaurant.location.longitude,
              }}
              onPress={() => setPopUpMarker(restaurant)}
            />
          ))} */}
          {/* {storeData.data.partners
            ? storeData.data.partners.map((stores) => (
                <Marker
                  key={stores.id}
                  title={stores.name}
                  destination={stores.address.description}
                  coordinate={{
                    latitude: stores.address.latitude,
                    longitude: stores.address.longitude,
                  }}
                  onPress={() => setPopUpMarker(stores)}
                />
              ))
            : null}
            {storeData.data.suggestion
            ? storeData.data.suggestion.map((stores) => (
                <Marker
                  key={stores.id}
                  title={stores.name}
                  destination={stores.address.description}
                  coordinate={{
                    latitude: stores.address.latitude,
                    longitude: stores.address.longitude,
                  }}
                  onPress={() => setPopUpMarker(stores)}
                />
              ))
            : null} */}
        </MapView>
      </View>
    );
  };

  const popUpView = () => {
    return (
      <>
        {popUpMarker ? (
          <View
            style={{
              height: 200,
              width: screenWidth,
              flex: 1,
            }}
          >
            <Text>{popUpMarker.name}</Text>
          </View>
        ) : null}
      </>
    );
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
      // console.log("aaa");
      // setUserRegion(null);
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
          {mapView()}
        </View>
        {/* <GGPlaces /> */}
        {openSearchModal()}
        {popUpView()}
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
export default MapScreen;
