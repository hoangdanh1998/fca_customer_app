import * as Location from "expo-location";

import PopupStore from './popup-store'
import { Dimensions, StyleSheet, View, } from "react-native";
import { KEY_GOOGLE_MAP, LANGUAGE, } from "../../constants/index";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import MapViewDirections from "react-native-maps-directions";

import { setDestination, setPartnerLocation } from "../../redux/actions/map";
import { setPartner } from '../../redux/actions/partner';
import { getStoreSuggestion } from '../../redux/actions/store';
import { IMLocalized, init } from '../../i18n/IMLocalized'


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
init(LANGUAGE.VI);
const MapScreen = () => {
  const dispatch = useDispatch();

  const detailsGeometry = useSelector(state => state.map.detailsGeometry);
  const suggestionStores = useSelector(state => state.store.suggestionStores);
  const bestSuggestion = useSelector(state => state.store.bestSuggestion);
  const partner = useSelector(state => state.partner.partner);
  // console.log({ suggestionStores })
  // console.log({ detailsGeometry })
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);

  const handleSetDetailsGeometry = useCallback((details) => {
    dispatch(setDestination(details));
  })

  const getSuggestionStore = async (destination) => {
    await dispatch(getStoreSuggestion(location.coords, destination));
  };

  const setSelectedStore = (store) => {
    setIsShowPopup(true)
    dispatch(setPartner(store));
    dispatch(setPartnerLocation({
      latitude: +store.address.latitude,
      longitude: +store.address.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }))
    setUserRegion({
      latitude: parseFloat(store.address.latitude),
      longitude: parseFloat(store.address.longitude),
    });

  }
  const openSearchModal = () => {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          // style={styles.searchBar}

          placeholder={IMLocalized("wording-search-destination")}
          minLength={2}
          predefinedPlaces={[{
            description: 'ĐH FPT',
            geometry: { location: { lat: 10.8414846, lng: 106.8100464 } },
          }]}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          textInputProps={{
          }}
          onPress={
            async (data, details = null) => {
              setIsShowPopup(true)
              getSuggestionStore({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })

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
          showsMyLocationButton
          rotateEnabled
          provider={PROVIDER_GOOGLE}
          region={userRegion}
          ref={mapRef}
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
              onReady={() => { }}
            />
          ) : null}

          {detailsGeometry ? (
            <Marker
              coordinate={{
                latitude: detailsGeometry.latitude,
                longitude: detailsGeometry.longitude,
              }}
            >

            </Marker>
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
                  />)
              } else {
                return (<Marker
                  key={store.id}
                  title={store.name}
                  destination={store.address.description}
                  coordinate={{
                    latitude: +store.address.latitude,
                    longitude: +store.address.longitude,
                  }}
                  moveOnMarkerPress
                  onPress={() => setSelectedStore(store)}
                />)
              }
            }
            ) : null}
        </MapView>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      console.log('useEffect')
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
        dispatch(setPartner(bestSuggestion))
      } else {
        setUserRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }); 
      }

    })();
  }, [bestSuggestion]);

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
        {partner && isShowPopup ?
          <PopupStore store={partner} />
          : null}
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
