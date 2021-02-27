/* eslint-disable react/prop-types */

import { withNavigation } from '@react-navigation/compat';
import { Card, CardItem, Left, Right } from "native-base";
import React from "react";
import {
    Image, Text,
    View
} from "react-native";
import OrderButton from "../../components/atoms/order-button/index";
import {
    LANGUAGE,
    MESSAGES
} from "../../constants/index";
import { init } from '../../i18n/IMLocalized';

const PopupStore = (props) => {
    init(LANGUAGE.VI);
    const { store } = props;
    return (<View
        style={{
            height: "25%",
            width: "100%",
        }}
    >
        <Card style={{ flex: 1 }}>
            <CardItem>
                <Left style={{ flex: 1 }}>
                    <Image
                        source={{
                            uri: store.imageLink,
                        }}
                        style={{ height: 100, width: "100%" }}
                    />
                </Left>
                <Right style={{ flex: 2, justifyContent: "flex-end" }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            width: "95%",
                        }}
                    >
                        {store.name}
                    </Text>
                    <Text></Text>
                    <Text style={{ textAlign: "left", width: "95%" }}>
                        {store.address.description}
                    </Text>
                </Right>
            </CardItem>
            <OrderButton
                block
                full
                name={MESSAGES.NEXT}
                disable={false}
                onPress={() =>
                    // eslint-disable-next-line react/prop-types
                    props.navigation.navigate("STORE_DETAIL", {
                        partnerId: store.id,
                        partner: store,
                    })
                }
            />
        </Card>
    </View>)
}
export default withNavigation(PopupStore);