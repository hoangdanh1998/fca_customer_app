import { withNavigation } from "@react-navigation/compat";
import { Content, List, Text } from "native-base";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/molecules/order-card/index";
import { OrderStatus } from "../../constants";
import { ORDER_ACTIONS } from "../../redux/action-types/actions";
import {
  setDestinationLocation,
  setPartnerLocation,
} from "../../redux/actions/map";
import { getHistory } from "../../redux/actions/emergency";
import EmergencyPartnerCard from "../../components/molecules/emergency-partner-card";

const EmergencyOrderList = (props) => {
  const arrEndpointStatus = [
    OrderStatus.CLOSURE,
    OrderStatus.RECEPTION,
    OrderStatus.REJECTION,
    OrderStatus.CANCELLATION,
  ];
  const handleNextScreen = (order) => {
    props.navigation.navigate("EDIT_EMERGENCY_ORDER", { id: order.id });
  };
  const suggestionEmergency = useSelector((state) => {
    return state.emergency.suggestionEmergency;
  });
  const customer = useSelector((state) => state.account.customer);

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
  }, [dispatch, loadSuggestionEmergency]);
  return (
    <Content>
      {suggestionEmergency.length > 0 ? (
        <List
          dataArray={suggestionEmergency}
          renderRow={(partner) => (
            // <OrderCard
            //   order={item}
            //   onNext={() => {
            //     handleNextScreen(item);
            //     // props.navigation.navigate("EDIT_EMERGENCY_ORDER");
            //   }}
            // />
            <EmergencyPartnerCard emergencyPartner={partner} />
          )}
        />
      ) : (
        <Text>Bạn chưa có đơn hàng nào</Text>
      )}
    </Content>
  );
};

export default withNavigation(EmergencyOrderList);
