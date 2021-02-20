import React, { useState } from "react";
import {
  Content,
  Header,
  List,
  Body,
  Title,
  Button,
  Icon,
  Left,
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
      <Header
        style={{
          flex: 1,
          backgroundColor: "#603a18",
        }}
      >
        <Left style={{ flex: 1 }}>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 9 }}>
          <Title>{IMLocalized("wording-my-orders")}</Title>
        </Body>
      </Header>

      <List
        dataArray={orderList}
        renderRow={(item) => <OrderCard order={item} />}
      />
    </Content>
  );
};

export default HistoryOrder;
