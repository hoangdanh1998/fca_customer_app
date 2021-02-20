import { Dimensions, ToastAndroid, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KEY_GOOGLE_MAP } from "../../constants/index";
import MapViewNavigation from "react-native-maps-navigation";

const googleMapNavigation = () => {
    return(
        <View>
            <MapViewNavigation
                apiKey={KEY_GOOGLE_MAP}
                origin={{
                    latitude: 10.8414899,
                    longitude: 106.8078577,
                  }}
                  destination={{
                    latitude: 10.8274174,
                    longitude: 106.6793407,
                  }}
                  simulate={true}
                  displayDebugMarkers={true}
            />
        </View>
    );
};
export default googleMapNavigation;