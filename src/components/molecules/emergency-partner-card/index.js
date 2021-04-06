import moment from "moment";
import {
  Card,
  CardItem,
  Content,
  H3,
  Icon,
  Left,
  Right,
  Text,
} from "native-base";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import NumberFormat from "react-number-format";
import { LANGUAGE } from "../../../constants/index.js";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { styles } from "./styles";

const EmergencyPartnerCard = (props) => {
  const partner = props.emergencyPartner.partner;
  const orders = props.emergencyPartner.orders;
  init(LANGUAGE.VI);
  return (
    <TouchableWithoutFeedback onPress={() => props.onNext(partner)}>
      <Card style={styles.card}>
        <CardItem style={styles.card2nd}>
          <Left>
            <Content style={styles.orderContent}>
              <H3 style={styles.storeName}>{partner?.name}</H3>
              <Text>
                {`${IMLocalized("wording-number-orders-in-store")} ${
                  orders.length
                } ${IMLocalized("wording-an-order")}`}
              </Text>
            </Content>
          </Left>
          <Right>
            <Icon
              button
              onPress={() => {
                props.onNext(partner);
              }}
              name="chevron-forward"
              style={styles.icon}
            />
          </Right>
        </CardItem>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default EmergencyPartnerCard;
