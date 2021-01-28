import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { KEY_GOOGLE_MAP } from "../../constance/constance";

export default () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const ggAPIUrl =
    "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
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
    searchApi("pasta");
  }, []);

  return [errorMessage, results, searchApi];
};
