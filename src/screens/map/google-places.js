import { Dimensions, ToastAndroid, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KEY_GOOGLE_MAP } from "../../constance/constance";

var screenWidth = Dimensions.get("window").width;
// const [initialRegion, setInitialRegion] = useState({
//   description: "empty",
//   latitude: 10.8274174,
//   longitude: 106.6793407 ,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// });

const openSearchModal = () => {
  // const showToast = () => {
  //   ToastAndroid.show(`${initialRegion.description} + ${initialRegion.latitude}`, ToastAndroid.SHORT);
  // };

  return (
    // <View>
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
          console.log(data.description);
          console.log(details.geometry.location.lat);
          console.log(details.geometry.location.lng);
          // setInitialRegion({
          //   description: details.description,
          //   latitude:details.geometry.location.lat,
          //   longitude: details.geometry.location.lng,
          // })

        }}
        query={{
          key: KEY_GOOGLE_MAP,
          components: 'country:vn', //limit country
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
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
    // </View>
  );
};
export default openSearchModal;
