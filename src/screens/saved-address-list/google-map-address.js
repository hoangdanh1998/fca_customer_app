import * as Location from "expo-location";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Button, Form, Text } from "native-base";
import { Card, CardItem, Footer, Left, Right } from "native-base";
import {
  DARK_COLOR,
  KEY_GOOGLE_MAP,
  LANGUAGE,
  MESSAGES,
  PRIMARY_LIGHT_COLOR,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FocusedButton from "../../components/atoms/focused-button/index";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { TextInput } from "react-native-gesture-handler";
import { saveAddress } from "../../redux/actions/map";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
init(LANGUAGE.VI);
const AddressScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [marked, setmarked] = useState(null);
  const [savedAddress, setsavedAdrees] = useState(props.route.params.addressId);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.account.customer);
  // const { addressId } = props.route.params;
  // addressId
  //   ? setmarked({
  //       longitude: addressId.longitude,
  //       latitude: addressId.latitude,
  //       description: addressId.description,
  //       label: addressId.label,
  //     })
  //   : null;
  const saveAddressLabel = async () => {
    try {
      await dispatch(
        saveAddress((id = customer.id), {
          customerAddressId: savedAddress?.id,
          label: marked.label,
          description: marked.description,
          latitude: `${marked.latitude}`,
          longitude: `${marked.longitude}`,
        })
      );
    } catch (error) {
      // setError(error);
      alert(error);
    }
  };

  const openSearchModal = () => {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          // style={styles.searchBar}
          keyboardShouldPersistTaps="handled"
          placeholder={IMLocalized("wording-choose-saved-address")}
          minLength={2}
          autoFocus={false}
          autoCorrect={false}
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          textInputProps={{}}
          onPress={async (data, details = null) => {
            setUserRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
            setmarked({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              name: details.name,
              description: details.formatted_address,
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
        >
          {marked ? (
            <Marker
              coordinate={{
                latitude: marked.latitude,
                longitude: marked.longitude,
              }}
            ></Marker>
          ) : null}
        </MapView>
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
        savedAddress
          ? (setUserRegion({
              latitude: parseFloat(savedAddress.latitude),
              longitude: parseFloat(savedAddress.longitude),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }),
            setmarked({
              latitude: parseFloat(savedAddress.latitude),
              longitude: parseFloat(savedAddress.longitude),
              label: savedAddress.label,
              description: savedAddress.description,
            }))
          : setUserRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

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
        {openSearchModal()}
        {marked ? (
          <Footer
            style={{ width: "100%", height: "auto", backgroundColor: null }}
          >
            <View style={{ height: "25%", width: "100%" }}>
              <Card
                bordered
                style={{
                  width: "100%",
                  height: "auto",
                  backgroundColor: "white",
                }}
              >
                <CardItem bordered>
                  <TextInput
                    style={{ height: "100%", width: "100%" }}
                    underlineColorAndroid="transparent"
                    placeholder={IMLocalized("wording-set-saved-address")}
                    placeholderTextColor={DARK_COLOR}
                    defaultValue={marked.label}
                    autoCapitalize="none"
                    onChangeText={(text) => (marked.label = text)}
                  />
                </CardItem>
                <Text>{marked?.name}</Text>
                <CardItem bordered>
                  <Text
                    style={{
                      height: "100%",
                      width: "100%",
                      color: DARK_COLOR,
                      fontWeight: "bold",
                    }}
                  >
                    {marked?.description}
                  </Text>
                </CardItem>
              </Card>
              <FocusedButton
                block
                name={MESSAGES.SAVE}
                disable={false}
                onPress={() => {
                  if (marked.label == "") {
                    alert(IMLocalized("wording-set-saved-address"));
                  } else {
                    saveAddressLabel();
                    props.navigation.navigate("SAVED_ADDRESS_LIST");
                  }
                }}
              />
            </View>
          </Footer>
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
export default AddressScreen;
