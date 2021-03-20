import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native";
import { Content, List } from "native-base";
import { withNavigation } from "@react-navigation/compat";
import OrderCard from "../../components/molecules/order-card/index";
import { getHistory } from "../../redux/actions/order";
import { HISTORY_ORDER } from "../../constants/seeding";
import { OrderStatus } from "../../constants";

const HistoryOrder = (props) => {
  //   var orderList = props.orderList;
  // var orderList = HISTORY_ORDER;
  console.log("history order screen name:", props.route.name);
  const arrStatus = [
    OrderStatus.CLOSURE,
    OrderStatus.RECEPTION,
    OrderStatus.REJECTION,
    OrderStatus.CANCELLATION
  ];
  const handleNextScreen = (order) => {
    
    if (arrStatus.includes(order.status)) {
      props.navigation.navigate("HISTORY_ORDER_DETAILS", {
        order: order,
        
      });
    }
    else {
      props.navigation.navigate("ORDER_DETAIL", {
        order: order,
        screenName: props.route.name
      });
    }

  }
  const history = useSelector((state) => {
    return state.order.history;
  });
  const customer = useSelector((state) => state.account.customer);

  const dispatch = useDispatch();
  const loadHistory = useCallback(async () => {
    try {
      await dispatch(getHistory(customer.account.phone));
    } catch (error) {
      // setError(error);
      alert(error);
    }
  }, [dispatch]);
  useEffect(() => {
    loadHistory();
  }, [dispatch, loadHistory]);
  return (
    <Content>
      <List
        dataArray={history}
        renderRow={(item) => (
          <OrderCard
            order={item}
            onNext={handleNextScreen}
          />
        )}
      />
    </Content>
  );
};

export default withNavigation(HistoryOrder);
