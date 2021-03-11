import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  KEY_GOOGLE_MAP,
  LANGUAGE,
  PRIMARY_LIGHT_COLOR,
  MESSAGES,
} from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import FocusedButton from "../../components/atoms/focused-button/index";
import { Button, Form, Text } from "native-base";
import { TextInput } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
init(LANGUAGE.VI);
const AddressScreen = () => {
  const [location, setLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [marked, setmarked] = useState(null);
  const [text, setText] = useState('');
  const [addressDetail, setaddress] = useState(null)
  const openSearchModal = () => {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          // style={styles.searchBar}

          placeholder={IMLocalized("wording-choose-saved-address")}
          minLength={2}
          predefinedPlaces={[
            {
              description: "ĐH FPT",
              geometry: { location: { lat: 10.8414846, lng: 106.8100464 } },
            },
          ]}
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
            });
            setaddress({
              Name: details.name,
              Address: details.formatted_address,
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
        setUserRegion({
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
          <View style={{ width: "100%", height: "25%", backgroundColor: "white" }}>
             <Text>{addressDetail?.Name}</Text>
             <Text>{addressDetail?.Address}</Text>
             <TextInput style = {{height: "30%", backgroundColor:"lightgrey", }}
               underlineColorAndroid = "transparent"
               placeholder = {IMLocalized("wording-set-saved-address")}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={text => setText(text)}/>
            <FocusedButton
              block
              name={MESSAGES.SAVE}
              disable={false}
              onPress={() => {
                //  props.navigation.navigate("ADD_ADDRESS");
                alert("Pressed")
              }}
            />
          </View>
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
  }
});
export default AddressScreen;
