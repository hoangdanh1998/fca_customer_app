import { StyleSheet } from "react-native";
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
  icon: { fontSize: 25, color: "black" },
  action0: { marginLeft: "33.3%", fontSize: 25, color: "black" },
  action1text: { textAlign: "center", fontSize: 20 },
});
