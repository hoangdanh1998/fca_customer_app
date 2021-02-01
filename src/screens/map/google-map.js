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

import GGMap from "../map/google-mapview";
import GGPlaces from "../map/google-places";
import GoogleMatrix from "../map/google-matrix";

const MapScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {/* <View
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
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <GGMap />
        </View>
        <GGPlaces />
      </View> */}
      <GoogleMatrix />
    </View>
  );
};

export default MapScreen;
