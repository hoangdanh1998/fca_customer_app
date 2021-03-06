import * as Location from "expo-location";
import { Footer, Icon } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import NotificationModal from "../../components/atoms/notification-modal/index";
import {
  DARK_COLOR,
  LANGUAGE,
  LIGHT_COLOR,
  MESSAGES,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import {
  setDestinationLocation,
  setPartnerLocation,
} from "../../redux/actions/map";
import { setPartner } from "../../redux/actions/partner";
import {
  getStoreSuggestion,
  setStoreSuggestion,
} from "../../redux/actions/store";
import { getEmergency } from "../../redux/actions/emergency";
import { convertEmergencyToNormal } from "../../utils/utils";
import PopupStore from "./popup-store";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
init(LANGUAGE.VI);

const MapScreen = (props) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const destinationLocation = useSelector(
    (state) => state.map.destinationLocation
  );
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);
  const partner = useSelector((state) => state.partner.partner);
  const profile = useSelector((state) => state.account.customer);
  const createdOrder = useSelector((state) => state.order.createdOrder);
  const emergency = useSelector((state) => state.emergency.emergency);
  const KEY_GOOGLE_MAP = useSelector((state) => state.map.googleKey);
  console.log("Key", KEY_GOOGLE_MAP);
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [visibleEmergencyModal, setVisibleEmergencyModal] = useState(false);

  const handleSetDetailsGeometry = (location) => {
    dispatch(setDestinationLocation(location));
  };

  const getSuggestionStore = async (destination) => {
    try {
      setError();
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({});
      await dispatch(
        getStoreSuggestion(profile.id, location.coords, destination)
      );
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
          id="GooglePlacesAutocomplete"
          placeholder={IMLocalized("wording-search-destination")}
          minLength={2}
          // listEmptyComponent
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
          // listEmptyComponent
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          textInputProps={{
            onFocus: () => {
              setIsShowPopup(false);
            },
            onBlur: () => {
              if (suggestionStores && suggestionStores.length > 0) {
                setIsShowPopup(true);
              }
            },
          }}
          keyboardShouldPersistTaps="handled"
          onPress={async (data, details = null) => {
            setIsShowPopup(true);
            handleSetDetailsGeometry({
              description: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });

            await getSuggestionStore({
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
                latitude: +destinationLocation.latitude,
                longitude: +destinationLocation.longitude,
              }}
              apikey={KEY_GOOGLE_MAP}
              strokeWidth={4}
              strokeColor={"blue"}
              onReady={() => {}}
            />
          ) : null}

          {destinationLocation ? (
            <Marker
              title={destinationLocation.description}
              coordinate={{
                latitude: +destinationLocation.latitude,
                longitude: +destinationLocation.longitude,
              }}
              onPress={() => {
                setIsShowPopup(false),
                  setUserRegion({
                    latitude: +destinationLocation.latitude,
                    longitude: +destinationLocation.longitude,
                  });
              }}
            ></Marker>
          ) : null}
          {suggestionStores
            ? suggestionStores.map((store) => {
                if (store.id == bestSuggestion.id) {
                  return (
                    <Marker
                      key={store.id}
                      title={store.name}
                      destination={store.address.description}
                      coordinate={{
                        latitude: +store.address.latitude,
                        longitude: +store.address.longitude,
                      }}
                      image={require("../../assets/coffee-shop-favorite.png")}
                      moveOnMarkerPress
                      onPress={() => setSelectedStore(store)}
                    ></Marker>
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
                      image={require("../../assets/coffee_shop.png")}
                      onPress={() => setSelectedStore(store)}
                    />
                  );
                }
              })
            : null}
        </MapView>
        {suggestionStores && suggestionStores.length === 0 && isShowPopup ? (
          <NotificationModal
            message={MESSAGES.NO_SUGGESTION}
            title={MESSAGES.TITLE_NOTIFICATION}
            visible={true}
            onDismiss={() => {
              // console.log('Dismiss')
              dispatch(setStoreSuggestion(null, null));
            }}
          />
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    (async () => {
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
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setError();
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        dispatch(getEmergency(profile.id));

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
          setIsShowPopup(true);
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
    })();
  }, [bestSuggestion]);

  return (
    <>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={DARK_COLOR} />
        </View>
      ) : (
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
            {profile?.orders && profile?.orders.length > 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (emergency && emergency?.items) {
                      props.navigation.navigate("CREATE_EMERGENCY_ORDER", {
                        emergencyOrder: convertEmergencyToNormal(emergency),
                      });
                    } else setVisibleEmergencyModal(true);
                  }}
                  style={
                    bestSuggestion && partner && isShowPopup
                      ? styles.secondaryEmergency
                      : styles.primaryEmergency
                  }
                >
                  <Icon
                    name="flash-outline"
                    size={30}
                    style={{ color: "#603a18" }}
                  />
                </TouchableOpacity>
                <AwesomeAlert
                  show={visibleEmergencyModal}
                  showProgress={false}
                  title={IMLocalized(`title-emergency-profile`)}
                  message={IMLocalized("wording-emergency-message")}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  contentStyle={{ backgroundColor: LIGHT_COLOR }}
                  contentContainerStyle={{ backgroundColor: LIGHT_COLOR }}
                  cancelText={IMLocalized("wording-later")}
                  confirmText={IMLocalized("wording-config")}
                  confirmButtonColor={DARK_COLOR}
                  showCancelButton={true}
                  showConfirmButton={true}
                  onDismiss={() => {
                    setVisibleEmergencyModal(false);
                  }}
                  onCancelPressed={() => {
                    setVisibleEmergencyModal(false);
                  }}
                  onConfirmPressed={() => {
                    setVisibleEmergencyModal(false);
                    props.navigation.navigate("EMERGENCY_ORDER_LIST");
                  }}
                />
              </>
            ) : null}

            {bestSuggestion && partner && isShowPopup ? (
              <Footer
                style={{
                  height: "auto",
                  backgroundColor: null,
                  borderColor: LIGHT_COLOR,
                }}
              >
                <PopupStore store={partner} />
              </Footer>
            ) : null}
          </View>
        </View>
      )}
    </>
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
  primaryEmergency: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: "5%",
    right: "3%",
    backgroundColor: LIGHT_COLOR,
    elevation: 2,
    borderRadius: 100,
    shadowColor: "grey",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  secondaryEmergency: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: "25%",
    right: "3%",
    backgroundColor: LIGHT_COLOR,
    elevation: 2,
    borderRadius: 100,
    shadowColor: "grey",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});
export default MapScreen;
