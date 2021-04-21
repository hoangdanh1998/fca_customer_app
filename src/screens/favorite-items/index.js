import { Body, Card, CardItem, Container, Content, Footer, List, Right } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableWithoutFeedback, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import FocusedButton from '../../components/atoms/focused-button';
import NotificationModal from '../../components/atoms/notification-modal/index';
import { DARK_COLOR, LIGHT_COLOR, MESSAGES, NOTICE_DURATION } from '../../constants';
import { getFCAItem, saveFavoriteItem } from '../../redux/actions/account';

export default function FavoriteItemScreen(props) {
    const dispatch = useDispatch();
    const listFCAItems = useSelector(state => state.account.fcaItems);
    const customer = useSelector((state) => state.account.customer);
    const favoriteFcaItems = useSelector(state => state.account.favoriteFcaItems);
    const [selectItemList, setSelectItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [visibleNotificationModal, setVisibleNotificationModal] = useState(
        false
    );
    const [notificationMessage, setNotificationMessage] = useState("");


    useEffect(() => {
        dispatch(getFCAItem());
        if (favoriteFcaItems) {
            const favoriteFcaItemIds = favoriteFcaItems.map((item) => { return item?.id })
            setSelectItemList([...favoriteFcaItemIds]);
        }
    }, [favoriteFcaItems])
    const handleSelectFCAItem = (item) => {
        const selectItem = selectItemList.findIndex((i) => i === item?.id);
        const newSelectionItemList = [...selectItemList];
        if (selectItem < 0) {
            newSelectionItemList.push(item.id);
        } else {
            newSelectionItemList.splice(selectItem, 1);
        }
        setSelectItemList(newSelectionItemList);
    };

    const handleSaveFavoriteItem = async () => {
        try {
            setIsLoading(true);
            await dispatch(saveFavoriteItem(customer?.id, selectItemList));
            setNotificationMessage(MESSAGES.DONE);
            setVisibleNotificationModal(true);
            setTimeout(() => {
                setVisibleNotificationModal(false);
            }, NOTICE_DURATION);
        } catch (error) {
            setNotificationMessage(MESSAGES.FAIL);
            setVisibleNotificationModal(true);
            setTimeout(() => {
                setVisibleNotificationModal(false);
            }, NOTICE_DURATION);
            console.error("error saving favorite item: ", error);
        }
        setIsLoading(false);

    }

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
                                <Card style={{ width: "95%", alignSelf: "center" }}>
                                    <CardItem
                                        style={
                                            selectItemList.includes(item?.id)
                                                ? { backgroundColor: LIGHT_COLOR }
                                                : null
                                        }
                                    >
                                        <Body style={{ flex: 8 }}>
                                            <Text style={{ width: "100%", fontSize: 20 }}>
                                                {item.name}
                                            </Text>
                                        </Body>
                                        <Right style={{ flex: 1 }}>
                                            {
                                                selectItemList.includes(item?.id)
                                                    ? <AntDesign
                                                        name="heart"
                                                        size={25}
                                                        color="#f08080"
                                                    />
                                                    : null
                                            }

                                        </Right>
                                    </CardItem>
                                </Card>

                            </TouchableWithoutFeedback>
                        );
                    }}
                />

            </Content>

            {
                
                        <Footer style={{ backgroundColor: "white" }}>
                            {!isLoading ?
                                (<View style={{ flex: 1 }}>
                                    <FocusedButton
                                        block
                                        name={MESSAGES.SAVE}
                                        disable={false}
                                        onPress={() => {
                                            handleSaveFavoriteItem();
                                        }}
                                    />
                                </View>)
                                : (<ActivityIndicator size="large" color={DARK_COLOR} />)
                            }
                        </Footer>
            }
            <NotificationModal
                message={notificationMessage}
                title={MESSAGES.TITLE_NOTIFICATION}
                visible={visibleNotificationModal}
            />

        </Container>
    )
}
