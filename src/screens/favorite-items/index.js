import { Body, CardItem, CheckBox, Container, Content, Left, List, ListItem, Right } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DARK_COLOR } from '../../constants';
import { getFCAItem } from '../../redux/actions/account';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FavoriteItemScreen() {
    const dispatch = useDispatch();
    const listFCAItems = useSelector(state => state.account.fcaItems);
    const [selectItemList, setSelectItemList] = useState([]);

    useEffect(() => {
        dispatch(getFCAItem());
    }, [dispatch])

    // console.log("fcaItems", listFCAItems);
    const handleSelectFCAItem = (item) => {
        const selectItem = selectItemList.findIndex((i) => i?.id === item?.id);
        // console.log("selected", selectItem);

        const newSelectionItemList = [...selectItemList];
        // console.log("newSelectionItemList:", newSelectionItemList);
        if (selectItem < 0) {
            newSelectionItemList.push(item);
            // console.log();
        } else {
            newSelectionItemList.splice(selectItem, 1);
        }
        setSelectItemList(newSelectionItemList);
        // console.log(selectItemList.toString());
    };
    return (
        <Container>
            <Content>
                <List
                    style={{ height: "auto" }}
                    dataArray={listFCAItems}
                    renderRow={(item) => {
                        return (
                            <TouchableWithoutFeedback

                                onPress={() => {
                                    handleSelectFCAItem(item);
                                }}
                            >
                                <CardItem>
                                    <Left style={{ flex: 1 }}>
                                        <CheckBox
                                            checked={selectItemList.includes(item)}
                                            color={DARK_COLOR}
                                            selectedColor={DARK_COLOR}
                                            onPress={() => handleSelectFCAItem(item)}
                                        />
                                    </Left>
                                    <Body style={{ flex: 8 }}>
                                        <Text style={{ width: "100%", fontSize: 20 }}>
                                            {item.name}
                                        </Text>
                                    </Body>
                                    <Right style={{ flex: 1 }}>
                                        {
                                            selectItemList.includes(item)
                                                ? <AntDesign
                                                    name="heart"
                                                    size={25}
                                                    color="red"
                                                />
                                                : null
                                        }

                                    </Right>
                                </CardItem>
                            </TouchableWithoutFeedback>
                        );
                    }}
                />
            </Content>
        </Container>
    )
}
