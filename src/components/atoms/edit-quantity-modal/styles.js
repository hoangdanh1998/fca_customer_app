import { StyleSheet } from "react-native";
import { DARK_COLOR } from "../../../constants/index";
export const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    height: 90,
    width: 90,
  },
  body: { justifyContent: "space-around" },
  name: { fontSize: 20 },
  price: { fontSize: 15 },
  right: { justifyContent: "space-between", flexDirection: "row" },
  icon: { fontSize: 25, color: DARK_COLOR },
  action0: { marginLeft: "33.3%", fontSize: 25, color: DARK_COLOR },
  action1text: { textAlign: "center", fontSize: 20, width: "100%" },
});
