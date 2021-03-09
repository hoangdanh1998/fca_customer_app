import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Content,
  List,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Icon,
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import OrderCard from "../../components/molecules/order-card/index";
import { getHistory } from "../../redux/actions/order";
import { DARK_COLOR } from "../../constants/index";
import { EMERGENCY_LIST } from "../../constants/seeding";

const SavedAddressList = (props) => {
  //   var orderList = props.orderList;
  var emergencyList = EMERGENCY_LIST;
  //   const history = useSelector((state) => {
  //     return state.order.history;
  //   });

  //   const dispatch = useDispatch();
  //   const loadHistory = useCallback(async () => {
  //     try {
  //       await dispatch(getHistory("0394422439"));
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }, [dispatch]);
  //   useEffect(() => {
  //     loadHistory();
  //   }, [dispatch, loadHistory]);
  return (
    <Content>
      <List
        dataArray={emergencyList}
        renderRow={(item) => (
          <Card>
            <CardItem>
              <Left>
                <Text note>{item.savedAddress.label}</Text>
              </Left>
              {item.savedAddress.isDefault ? (
                <Right>
                  <Text note>Default Address</Text>
                </Right>
              ) : null}
            </CardItem>
            <CardItem>
              <Left>
                <Text>{item.savedAddress.address.description}</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Icon name="arrow-forward" color={DARK_COLOR} />
              </Right>
            </CardItem>
          </Card>
        )}
      />
    </Content>
  );
};

export default withNavigation(SavedAddressList);
