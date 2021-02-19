import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { KEY_GOOGLE_MAP } from "../../constants/index";

const GoogleMatrix = () => {
  // const dumData=[{
  //   lat_destination: 10.8414899,
  //   lng_destination: 106.8078577,
  // }]
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
    const [matrix,setMatrix]=useState(null)
  const google_APIUrl =
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=10.8277609,106.6793874&destinations=10.8224989,106.6880843&key=${KEY_GOOGLE_MAP}`;
  // "&origin="
  // "&destination="
  // "&key="${KEY_GOOGLE_MAP}
  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
    } catch (error) {
      seterrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    (async () => {
      fetch(google_APIUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.rows[0].elements[0].distance.text)
        console.log(responseJson.rows[0].elements[0].duration.text)
        // setMatrix({
        //   distance:responseJson.distance,
        //   duration:responseJson.duration
        // })
      })
      .catch((error) => {
        console.error(error);
      });
    })();
  }, []);


  // matrixCallApi = async () => {
  //   fetch(google_APIUrl)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson.rows.elements.distance.text)
  //       console.log(responseJson.rows.elements.duration.text)
  //       setMatrix({
  //         distance:responseJson.rows.elements.distance.text,
  //         duration:responseJson.rows.elements.duration.text
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  return(
    <View>
  
    </View>
  );
}

  export default GoogleMatrix;
