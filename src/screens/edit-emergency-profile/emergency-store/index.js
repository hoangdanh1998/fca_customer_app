/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import { TouchableWithoutFeedback } from "react-native";
import { SearchBar } from "react-native-elements";
import { View, Footer, Content, List, Card } from "native-base";
import StoreProfileWithAvatar from "../../../components/molecules/store-profile-with-avatar/index";
import FocusedButton from "../../../components/atoms/focused-button/index";
import { LANGUAGE, MESSAGES, LIGHT_COLOR } from "../../../constants/index";
import { init, IMLocalized } from "../../../i18n/IMLocalized";

const EmergencyStore = (props) => {
  init(LANGUAGE.VI);
  const currentStore = Object.assign({}, props.route.params.currentStore);
  const [selectedStore, setSelectedStore] = useState(currentStore);
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const [stores, setStores] = useState(() => {
    const result = Array.from(suggestionStores, (store) => {
      return store;
    });
    return result;
  });
  const [keyword, setKeyword] = useState("");
  const changeKeyword = (search) => {
    setKeyword(search);
  };
  const handleSelectStore = (selectedStore) => {
    setSelectedStore(selectedStore);
  };
  return (
    <>
      <Content>
        <SearchBar
          lightTheme
          placeholder={IMLocalized("wording-search-store")}
          onChangeText={changeKeyword}
          value={keyword}
        />
        <List
          dataArray={stores}
          renderRow={(store) => (
            <TouchableWithoutFeedback
              onPress={() => {
                handleSelectStore(store);
              }}
            >
              <Card>
                <StoreProfileWithAvatar
                  selectedColor={
                    store.address.id === selectedStore.address.id
                      ? LIGHT_COLOR
                      : null
                  }
                  store={store}
                />
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FocusedButton
            block
            name={MESSAGES.NEXT}
            disable={false}
            onPress={() => {
              props.navigation.navigate("EMERGENCY_ITEM", {
                partnerId: selectedStore.id,
              });
            }}
          />
        </View>
      </Footer>
    </>
  );
};
export default withNavigation(EmergencyStore);
