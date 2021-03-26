import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import {
  DARK_COLOR,
  KEY_GOOGLE_MAP,
  LANGUAGE,
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  setDestinationLocation,
  setPartnerLocation,
} from "../../redux/actions/map";
import { setPartner } from "../../redux/actions/partner";
import { getStoreSuggestion } from "../../redux/actions/store";
import PopupStoreEmergency from "./emergency-popup-store";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
init(LANGUAGE.VI);
const EmergencyMapScreen = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const destinationLocation = useSelector(
    (state) => state.map.destinationLocation
  );
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);
  const partner = useSelector((state) => state.partner.partner);
  const profile = useSelector((state) => state.account.customer);
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleSetDetailsGeometry = (location) => {
    dispatch(setDestinationLocation(location));
  };

  const getSuggestionStore = async (destination) => {
    try {
      setError();
      setIsLoading(true);
      await dispatch(getStoreSuggestion(location.coords, destination));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const setSelectedStore = (store) => {
    setIsShowPopup(true);
    dispatch(setPartner(store));
    dispatch(
      setPartnerLocation({
        latitude: +store.address.latitude,
        longitude: +store.address.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    );

    setUserRegion({
      latitude: +store.address.latitude,
      longitude: +store.address.longitude,
    });
  };
  const openSearchModal = () => {
    return (
      <View style={{ flex: 1 }}>
      
        
        <GooglePlacesAutocomplete
          // style={styles.searchBar}

          placeholder={IMLocalized("wording-search-destination")}
          minLength={2}
          predefinedPlaces={
            profile && profile.address && profile.address.length > 0
              ? profile.address.map((a) => {
                  return {
                    description: a.label,
                    geometry: {
                      location: {
                        lat: +a.latitude,
                        lng: +a.longitude,
                      },
                    },
                  };
                })
              : []
          }
  
          textInputHide={true}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          textInputProps={{}}
          onPress={async (data, details = null) => {
            setIsShowPopup(true);
            getSuggestionStore({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });

            handleSetDetailsGeometry({
              description: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
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
          showsMyLocationButton
          rotateEnabled
          provider={PROVIDER_GOOGLE}
          region={userRegion}
          ref={mapRef}
        >
          {userRegion && destinationLocation ? (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
              apikey={KEY_GOOGLE_MAP}
              strokeWidth={4}
              strokeColor="blue"
              onReady={() => {}}
            />
          ) : null}

          {destinationLocation ? (
            <Marker
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
            ></Marker>
          ) : null}
          {suggestionStores
            ? suggestionStores.map((store) => {
                if (store.id == bestSuggestion.id) {
                  return (
                    <Marker
                      pinColor="blue"
                      key={store.id}
                      title={store.name}
                      destination={store.address.description}
                      coordinate={{
                        latitude: +store.address.latitude,
                        longitude: +store.address.longitude,
                      }}
                      moveOnMarkerPress
                      onPress={() => setSelectedStore(store)}
                    />
                  );
                } else {
                  return (
                    <Marker
                      key={store.id}
                      title={store.name}
                      destination={store.address.description}
                      coordinate={{
                        latitude: +store.address.latitude,
                        longitude: +store.address.longitude,
                      }}
                      moveOnMarkerPress
                      onPress={() => setSelectedStore(store)}
                    />
                  );
                }
              })
            : null}
        </MapView>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      console.log("useEffect");

      try {
        setError();
        setIsLoading(true);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        if (bestSuggestion) {
          setUserRegion({
            latitude: +bestSuggestion.address.latitude,
            longitude: +bestSuggestion.address.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
          dispatch(setPartner(bestSuggestion));
          dispatch(setPartnerLocation(bestSuggestion.address));
        } else {
          setUserRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    })();
  }, [bestSuggestion]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
      </View>
    );
  }

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
        <TextInput
          style={{
            backgroundColor: "white",
            top: 15,
            width: screenWidth - 10,
            borderWidth: 0,
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          }}
          underlineColorAndroid="transparent"
          placeholder={IMLocalized("wording-search-destination")}
          placeholderTextColor={DARK_COLOR}
          
          // defaultValue={savedAddress?.label}
          autoCapitalize="none"
          onChangeText={(text) => (marked.label = text)}
        />
        <TextInput
          style={{
            backgroundColor: "white",
            top: 15,
            width: screenWidth - 10,
            marginTop: 10,
            borderWidth: 0,
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          }}
          underlineColorAndroid="transparent"
          placeholder={IMLocalized("Current Location change")}
          placeholderTextColor={DARK_COLOR}
          // defaultValue={savedAddress?.label}
          autoCapitalize="none"
          onChangeText={(text) => (marked.label = text)}
        />
        {openSearchModal()}
        {partner && isShowPopup ? (
          <PopupStoreEmergency store={partner} />
        ) : null}
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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EmergencyMapScreen;
