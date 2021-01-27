import { Dimensions, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KEY_GGMAP } from "../../constance/constance";

var screenWidth = Dimensions.get("window").width;
const openSearchModal = () => {
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
          console.log(data, details);
        }}
        query={{
          key: KEY_GGMAP,
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
