import * as Location from "expo-location";

import { Card, CardItem, Left, Right } from "native-base";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  KEY_GOOGLE_MAP,
  MESSAGES,
  LANGUAGE,
} from "../../constants/index";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import OrderButton from "../../components/atoms/order-button/index";
import { setDestination, setPartnerLocation } from "../../redux/actions/map";
import { IMLocalized, init } from '../../i18n/IMLocalized'


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
init(LANGUAGE.VI);
const MapScreen = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  // const [detailsGeometry, setDetailsGeometry] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);
  const [storeSuggestion, setStoreSuggestion] = useState(null);
  const dispatch = useDispatch();

  const detailsGeometry = useSelector(state => state.map.detailsGeometry);

  const getSuggestionStores = (plainText) => {
    fetch("https://api-fca.xyz/api/partner/suggestion", {
      method: "POST",
      body: JSON.stringify(plainText),
    })
      .then((response) => response.json())
      .then((suggestedStores) => {
        if (suggestedStores.meta.status == "SUCCESS") {
          setStoreSuggestion(suggestedStores);
        } else console.log(suggestedStores);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShowPopup = useCallback(
    (store) => {
      setPopUpMarker(store);
      dispatch(setPartnerLocation({
        latitude: parseFloat(store.address.latitude),
        longitude: parseFloat(store.address.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }))
      setUserRegion({
        latitude: parseFloat(store.address.latitude),

        longitude: parseFloat(store.address.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, 
      });
    },
    [popUpMarker]
  );

  const handleSetDetailsGeometry = useCallback((details) => {
    dispatch(setDestination(details));
  })

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
          getSuggestionStores(responseJson.routes[0].legs[0].steps);
        } else {
          console.log("Not OK");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openSearchModal = () => {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          // style={styles.searchBar}
          placeholder={IMLocalized("wording-search-destination")}
          minLength={2}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          onPress={
            (data, details = null) => {

              handleSetDetailsGeometry({
                description: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
            }
          }
          query={{
            key: KEY_GOOGLE_MAP,
            components: "country:vn", //limit country
          }}
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
                  // eslint-disable-next-line react/prop-types
                  props.navigation.navigate("STORE_DETAIL", {
                    partnerId: popUpMarker.id,
                    partner: popUpMarker,
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
        console.log("Permission to access location was denied");
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
        height: "100%",
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
        {openSearchModal()}
        {popUpView()}
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
export default MapScreen;
