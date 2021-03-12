/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "@react-navigation/compat";
import { TouchableWithoutFeedback } from "react-native";
import { SearchBar } from "react-native-elements";
import { Content, List, Card, Toast, Root } from "native-base";
import SelectItemModal from "../../components/molecules/select-item-modal/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import {
  LANGUAGE,
  MESSAGES,
  LIGHT_COLOR,
  NOTICE_DURATION,
  MAX_ORDER_ITEM,
  DARK_COLOR,
} from "../../constants/index";
import { init, IMLocalized } from "../../i18n/IMLocalized";

const EditEmergencyProfile = (props) => {
  init(LANGUAGE.VI);
  // const currentStore = Object.assign({}, props.route.params.currentStore);
  const suggestionStores = useSelector((state) => state.store.suggestionStores);
  const [selectedStore, setSelectedStore] = useState({});
  const [stores, setStores] = useState(() => {
    return Array.from(suggestionStores, (store) => {
      return {
        ...store,
        convertedItems: Array.from(store.items, (item) => {
          return {
            image: item.imageLink,
            name: item.name,
            price: item.price,
            quantity: 0,
          };
        }),
      };
    });
  });
  const [searchStores, setSearchStores] = useState(stores);
  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    total: 0,
  });
  const [keyword, setKeyword] = useState("");
  const [visibleSelectItem, setVisibleSelectItem] = useState(false);

  const handleInputSearch = (search) => {
    setKeyword(search);
    if (search.length === 0) {
      setSearchStores(stores);
      return;
    }
    const searchList = stores.filter((store) => {
      return (
        store.name.search(search) > 0 ||
        store.address.description.search(search) > 0
      );
    });
    setSearchStores(searchList);
  };

  const handleSelectStore = (selectedStore) => {
    setSelectedStore(selectedStore);
    setVisibleSelectItem(true);
  };

  const handleHideSelectStore = () => {
    setVisibleSelectItem(false);
    setCart({
      items: [],
      quantity: 0,
      total: 0,
    });
    setStores(
      Array.from(suggestionStores, (store) => {
        return {
          ...store,
          convertedItems: Array.from(store.items, (item) => {
            return {
              image: item.imageLink,
              name: item.name,
              price: item.price,
              quantity: 0,
            };
          }),
        };
      })
    );
    setSelectedStore({});
  };

  const handleSaveEmergencyProfile = (profile) => {
    alert("Save emergency profile" + profile.quantity);
  };

  const updateCart = (item, quantity) => {
    var newCart = { ...cart };
    if (newCart.quantity >= MAX_ORDER_ITEM && quantity > 0) {
      Toast.show({
        text: IMLocalized("wording-too-much-item"),
        buttonText: "OK",
        duration: NOTICE_DURATION,
        position: "bottom",
      });
      return;
    }
    const index = newCart.items.findIndex((cartItem) => {
      return cartItem.id === item.id;
    });

    //update quantity of item
    item.quantity += quantity;

    if (item.quantity <= 0) {
      newCart.items.splice(index, 1);
    } else {
      if (index === -1) {
        newCart.items.push(item);
      } else {
        newCart.items[index] = item;
      }
    }

    newCart.quantity += quantity;

    newCart.total += quantity * parseInt(item.price);

    setCart({ ...cart, ...newCart });
  };
  return (
    <Root>
      <Content>
        <SearchBar
          containerStyle={{ backgroundColor: "white" }}
          inputContainerStyle={{ backgroundColor: "white" }}
          inputStyle={{ color: DARK_COLOR }}
          placeholderTextColor={DARK_COLOR}
          searchIcon={{ color: DARK_COLOR }}
          onClear={() => {
            setStores(stores);
          }}
          lightTheme
          placeholder={IMLocalized("wording-search-store")}
          onChangeText={handleInputSearch}
          value={keyword}
        />
        <List
          dataArray={searchStores}
          renderRow={(store) => (
            <TouchableWithoutFeedback
              onPress={() => {
                handleSelectStore(store);
              }}
            >
              <Card>
                <StoreProfileWithAvatar store={store} />
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
        {selectedStore !== null ? (
          <SelectItemModal
            partner={selectedStore}
            visible={visibleSelectItem}
            cart={cart}
            updateCart={(item, quantity) => updateCart(item, quantity)}
            hideModal={handleHideSelectStore}
            saveProfile={(profile) => handleSaveEmergencyProfile(profile)}
          />
        ) : null}
      </Content>
    </Root>
  );
};
export default withNavigation(EditEmergencyProfile);
