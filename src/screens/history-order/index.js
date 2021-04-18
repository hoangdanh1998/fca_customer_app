import { withNavigation } from "@react-navigation/compat";
import { Content, List, Text, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/molecules/order-card/index";
import { OrderStatus } from "../../constants";
import { DARK_COLOR, LANGUAGE } from "../../constants/index";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { ORDER_ACTIONS } from "../../redux/action-types/actions";
import {
  setDestinationLocation,
  setPartnerLocation
} from "../../redux/actions/map";
import { getHistory } from "../../redux/actions/order";
init(LANGUAGE.VI);
const HistoryOrder = (props) => {
  //   var orderList = props.orderList;
  // var orderList = HISTORY_ORDER;
  const [isLoading, setIsLoading] = useState(false);
  const arrEndpointStatus = [
    OrderStatus.CLOSURE,
    OrderStatus.RECEPTION,
    OrderStatus.REJECTION,
    OrderStatus.CANCELLATION,
  ];
  const handleNextScreen = (order) => {
    if (arrEndpointStatus.includes(order.status)) {
      props.navigation.navigate("HISTORY_ORDER_DETAILS", {
        order: order,
      });
    } else {
      dispatch({
        type: ORDER_ACTIONS.SET_CREATED_ORDER,
        payload: order,
      });
      dispatch(setPartnerLocation(order.partner.address));
      dispatch(setDestinationLocation(order.destination));
      props.navigation.navigate("ORDER_DETAIL", {
        order: order,
        screenName: props.route.name,
      });
    }
  };
  const history = useSelector((state) => {
    return state.order.history;
  });
  const customer = useSelector((state) => state.account.customer);

  const dispatch = useDispatch();
  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getHistory(customer));
      setIsLoading(false);
    } catch (error) {
      // setError(error);
      alert(error);
    }
  }, [dispatch]);
  useEffect(() => {
    loadHistory();
  }, [dispatch, loadHistory]);
  return (
    <>{isLoading ? (
      <>
        <View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ActivityIndicator size="large" color={DARK_COLOR} />
        </View>
      </>) : (
      <Content>
      {history.length > 0 ? (
      <List
        dataArray={history}
        renderRow={(item) => (
          <OrderCard order={item} onNext={handleNextScreen} />
        )}
      />
      ) : (
      <Text>{IMLocalized("wording-no-data")}</Text>
      )}
      </Content>)}
    </>
  );
};

export default withNavigation(HistoryOrder);
