import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Content,
  Footer,
  Header,
  List,
  Root,
  Text,
  Toast,
} from "native-base";
import { withNavigation } from "@react-navigation/compat";
import OrderDetailCard from "../../components/atoms/order-detail-card/index";
import StoreProfileWithAvatar from "../../components/molecules/store-profile-with-avatar/index";
import { styles } from "./styles";
import { IMLocalized, init } from "../../i18n/IMLocalized";
import { EMERGENCY_PROFILE } from "../../constants/seeding";
import { LANGUAGE } from "../../constants/index.js";

import { getPartnerInformation } from "../../redux/actions/partner";

const EmergencyProfile = (props) => {
  init(LANGUAGE.VI);
  const profile = EMERGENCY_PROFILE;

  // ================================= HANDLE UI =================================

  return (
    <Content style={styles.content}>
      <StoreProfileWithAvatar store={profile.partner} />
      <Card>
        <List
          dataArray={profile.selectedItem}
          renderRow={(item) => <OrderDetailCard item={item} />}
        />
      </Card>
    </Content>
  );
};

export default withNavigation(EmergencyProfile);
