import { StyleSheet } from "react-native";
import { DARK_COLOR } from "../../../constants/index";
export const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    height: 30,
    width: 30,
  },
  left: { flex: 2.5 },
  body: { justifyContent: "space-around", flex: 5 },
  name: { fontSize: 15 },
  price: { fontSize: 15 },
  right: { justifyContent: "space-around", flex: 2.5 },
  icon: { fontSize: 25, color: DARK_COLOR },
  action0: { marginLeft: "33.3%", fontSize: 25, color: DARK_COLOR },
  action1text: { textAlign: "center", fontSize: 20 },
});
