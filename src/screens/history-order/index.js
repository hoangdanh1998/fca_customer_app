import React, { useState } from "react";
import {
  Body,
  Button,
  Content,
  Header,
  Icon,
  Left,
  List,
  Title,
} from "native-base";
import OrderCard from "../../components/molecules/order-card/index";
// import { styles } from "./styles";
import { HISTORY_ORDER } from "../../constants/seeding";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { LANGUAGE } from "../../constants/index.js";

const HistoryOrder = (props) => {
  //   var orderList = props.orderList;
  var orderList = HISTORY_ORDER;
  init(LANGUAGE.VI);
  return (
    <Content>
      <List
        dataArray={orderList}
        renderRow={(item) => <OrderCard order={item} />}
      />
    </Content>
  );
};

export default HistoryOrder;
