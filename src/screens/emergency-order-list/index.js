import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content, List, Text, View } from "native-base";
import { ActivityIndicator } from "react-native";
import EmergencyPartnerCard from "../../components/molecules/emergency-partner-card";
import { withNavigation } from "@react-navigation/compat";
import { PRIMARY_LIGHT_COLOR, LANGUAGE } from "../../constants";
import { getHistory } from "../../redux/actions/emergency";
import { IMLocalized, init } from "../../i18n/IMLocalized";

init(LANGUAGE.VI);
const EmergencyOrderList = (props) => {
  const handleNextScreen = (order) => {
    props.navigation.navigate("EDIT_EMERGENCY_ORDER", { id: order.id });
  };
  const suggestionEmergency = useSelector((state) => {
    return state.emergency.suggestionEmergency;
  });
  const customer = useSelector((state) => state.account.customer);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const loadSuggestionEmergency = useCallback(async () => {
    try {
      dispatch(getHistory(customer));
    } catch (error) {
      alert(error);
    }
  }, [dispatch]);
  useEffect(() => {
    loadSuggestionEmergency();
    setIsLoading(false);
  }, [dispatch, loadSuggestionEmergency]);

  const handleOnPressPartner = (partner) => {
    props.navigation.navigate("EDIT_EMERGENCY_ORDER", {
      selectedPartner: partner,
    });
  };

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={PRIMARY_LIGHT_COLOR} />
    </View>
  ) : (
    <Content>
      {suggestionEmergency.length > 0 ? (
        <List
          dataArray={suggestionEmergency}
          renderRow={(partner) => (
            <EmergencyPartnerCard
              onNext={(p) => {
                handleOnPressPartner(p);
              }}
              emergencyPartner={partner}
            />
          )}
        />
      ) : (
        <Text>{IMLocalized("wording-no-data")}</Text>
      )}
    </Content>
  );
};

export default withNavigation(EmergencyOrderList);
