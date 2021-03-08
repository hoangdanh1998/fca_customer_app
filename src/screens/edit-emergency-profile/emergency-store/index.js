/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import { SearchBar } from "react-native-elements";
import { View, Footer, Content, List } from "native-base";
import StoreProfileWithAvatar from "../../../components/molecules/store-profile-with-avatar/index";
import FocusedButton from "../../../components/atoms/focused-button/index";
import { LANGUAGE, MESSAGES } from "../../../constants/index";
import { init, IMLocalized } from "../../../i18n/IMLocalized";

const EmergencyStore = (props) => {
  init(LANGUAGE.VI);
  const bestSuggestion = useSelector((state) => state.store.bestSuggestion);
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const [stores, setStores] = useState(() => {
    const result = Array.from(suggestionStores, (store) => {
      return store;
    });
    // result.unshift(bestSuggestion);
    return result;
  });
  const [keyword, setKeyword] = useState("");
  const changeKeyword = (search) => {
    setKeyword(search);
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
          renderRow={(store) => <StoreProfileWithAvatar store={store} />}
        />
      </Content>
      <Footer style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FocusedButton
            block
            name={MESSAGES.NEXT}
            disable={false}
            onPress={() => {
              handlePressFocusedButton();
            }}
          />
        </View>
      </Footer>
    </>
  );
};
export default withNavigation(EmergencyStore);
