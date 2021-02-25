import * as Location from "expo-location";

import { Card, CardItem, Left, Right } from "native-base";
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

import GoogleMatrix from "../map/google-matrix";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import OrderButton from "../../components/atoms/order-button/index";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const MapScreen = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [detailsGeometry, setDetailsGeometry] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);
  const [directionReturn, setDirectionReturn] = useState(null);
  const [storeSuggestion, setStoreSuggestion] = useState(null);
  const [suppliedMarker, setsuppliedMarker] = useState(null);
  const [distanceTravel, setDistanceTravel] = useState(0);

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

  const getSuggestionStores = (plainText) => {
    fetch("https://api-fca.xyz/api/partner/suggestion", {
      method: "POST",
      body: JSON.stringify(plainText),
    })
      .then((response) => response.json())
      .then((suggestedStores) => {
        if (suggestedStores.meta.status == "SUCCESS") {
          setStoreSuggestion(suggestedStores);
          // const arrayOfPoints = [];
          // suggestedStores.data.partners.map((partner) => {
          //   arrayOfPoints.push({
          //     latitude: partner.address.latitude,
          //     longitude: partner.address.longitude,
          //   });
          // });
          // setsuppliedMarker(arrayOfPoints.map(suppliedMarker => arrayOfPoints));
          // console.log(suppliedMarker);
          
          // storeSuggestion?.data.partners.map((partner) => {
          //   return {
          //       latitude: partner.address.latitude,
          //       longitude: partner.address.longitude,
          //   };
        } else console.log(suggestedStores);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShowPopup = useCallback(
    (store) => {
      setPopUpMarker(store);
      setUserRegion({
        latitude: parseFloat(store.address.latitude),
        longitude: parseFloat(store.address.longitude),
      });
    },
    [popUpMarker]
  );

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

  const arrayOfPoints = storeSuggestion?.data.partners.map((partner) => {
    return {
      latitude: partner.address.latitude,
      longitude: partner.address.longitude,
    };
  });
  const openSearchModal = () => {
    // const showToast = () => {
    //   ToastAndroid.show(`${initialRegion.description} + ${initialRegion.latitude}`, ToastAndroid.SHORT);
    // };
    return (
      <View style={{ flex: 1 }}>
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
          ref={userRegion && detailsGeometry ? (mapRef) => {
            {userRegion && detailsGeometry ? (
              mapRef.fitToCoordinates({
                coordinates:[
                  {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  {
                    latitude: detailsGeometry.latitude,
                    longitude: detailsGeometry.longitude,
                  }]
                }
                )
            ) : null}
            // suppliedMarker
            //   ? mapRef.fitToCoordinates(suppliedMarker)
            //     // console.log(arrayOfPoints)
            //   : null;
          }:null}
          showsUserLocation={true}
          // onUserLocationChange={async ()=> {
          //   getDistance(await Location.getCurrentPositionAsync({}));
          // }}
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
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
          {/* //onPress={() => handleShowPopup(stores)} */}

          {detailsGeometry ? (
            <Marker
              coordinate={{
                latitude: detailsGeometry.latitude,
                longitude: detailsGeometry.longitude,
              }}
            />
          ) : null}

          {storeSuggestion
            ? storeSuggestion.data.partners.map((stores) =>
                stores.id == storeSuggestion.data.suggestion.id ? (
                  <Marker
                    pinColor="blue"
                    key={stores.id}
                    title={stores.name}
                    destination={stores.address.description}
                    coordinate={{
                      latitude: parseFloat(stores.address.latitude),
                      longitude: parseFloat(stores.address.longitude),
                    }}
                    onPress={() => handleShowPopup(stores)}
                  />
                ) : (
                  <Marker
                    key={stores.id}
                    title={stores.name}
                    destination={stores.address.description}
                    coordinate={{
                      latitude: parseFloat(stores.address.latitude),
                      longitude: parseFloat(stores.address.longitude),
                    }}
                    onPress={() => handleShowPopup(stores)}
                  />
                )
              )
            : null}
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
              height: "25%",
              width: "100%",
            }}
          >
            <Card style={{ flex: 1 }}>
              <CardItem>
                <Left style={{ flex: 1 }}>
                  <Image
                    source={{
                      uri: popUpMarker.imageLink,
                    }}
                    style={{ height: 100, width: "100%" }}
                  />
                </Left>
                <Right style={{ flex: 2, justifyContent: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      width: "95%",
                    }}
                  >
                    {popUpMarker.name}
                  </Text>
                  <Text></Text>
                  <Text style={{ textAlign: "left", width: "95%" }}>
                    {popUpMarker.address.description}
                  </Text>
                </Right>
              </CardItem>
              <OrderButton
                block
                full
                name={MESSAGES.NEXT}
                disable={false}
                onPress={() =>
                  props.navigation.navigate("STORE_DETAIL", {
                    partnerId: popUpMarker.id,
                  })
                }
              />
            </Card>
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
