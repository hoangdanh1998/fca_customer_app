import { Body, CardItem, Icon, Left, Right } from "native-base";
import React from "react";
import { Image, Text, View } from "react-native";
import NumberFormat from "react-number-format";
import { LANGUAGE } from "../../../constants/index";
import { IMLocalized, init } from "../../../i18n/IMLocalized";
import { styles } from "./styles";

const DrinkCard = (props) => {
  var drink = props.drink;
  //   var drink = DRINK;
  init(LANGUAGE.VI);
  return (
    <CardItem style={styles.container}>
      <Left>
        <Image
          source={{
            uri: drink.image,
          }}
          style={styles.image}
        />
      </Left>
      <Body style={styles.body}>
        <Text style={styles.name}>{drink.name}</Text>
        <NumberFormat
          value={drink.price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(formattedValue) => (
            <Text note style={styles.price}>
              {formattedValue} {IMLocalized("currency")}
            </Text>
          )}
        />
      </Body>
      <Right>
        <View style={styles.right}>
          {drink.quantity > 0 ? (
            <>
              <View style={{ flex: 1 }}>
                <Icon
                  style={styles.icon}
                  button
                  onPress={props.removeItem}
                  name="remove-circle-outline"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.action1text}>{drink.quantity}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Icon
                  style={styles.icon}
                  button
                  onPress={props.addItem}
                  name="add-circle-outline"
                />
              </View>
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <Icon
                style={styles.action0}
                button
                onPress={props.addItem}
                name="add-circle-outline"
              />
            </View>
          )}
        </View>
      </Right>
    </CardItem>
  );
};

export default DrinkCard;
