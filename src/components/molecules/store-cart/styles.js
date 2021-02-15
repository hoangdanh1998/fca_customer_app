import { StyleSheet } from "react-native";

import { DARK_COLOR, LIGHT_COLOR } from "../../../constants/index";
export const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: LIGHT_COLOR },
  item: { backgroundColor: LIGHT_COLOR },
  right: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
    color: DARK_COLOR,
    fontWeight: "bold",
  },
  body: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: DARK_COLOR,
    fontWeight: "bold",
  },
  left: {
    width: "100%",
    textAlign: "right",
    fontSize: 20,
    color: DARK_COLOR,
    fontWeight: "bold",
  },
});
