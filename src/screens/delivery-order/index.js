import React, { useState } from "react";
import { View, Image } from "react-native";
import { Content, Button } from "native-base";

import { styles } from "./styles";
import NotificationModal from "../../components/atoms/notification-modal/index";
import { QR_CODE_BASE64 } from "../../constants/seeding";
import { MESSAGES } from "../../constants/index.js";

const DeliveryOrder = (props) => {
  //   var imageBase64 = props.imageString;
  var imageBase64 = QR_CODE_BASE64;

  const [visible, setVisible] = useState(false);

  showModal = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  return (
    <Content style={{ flex: 1 }}>
      <View style={styles.view}>
        <Image
          style={{
            flex: 1,
          }}
          source={{ uri: imageBase64 }}
        />
      </View>
      <Button
        style={{ width: 400, height: 400 }}
        title="Show Modal"
        onPress={() => {
          showModal();
        }}
      />
      {visible === true ? <NotificationModal message={MESSAGES.DONE} /> : null}
    </Content>
  );
};

export default DeliveryOrder;
