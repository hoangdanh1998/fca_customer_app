import { StyleSheet } from "react-native";
import { DARK_COLOR } from "../../../constants/index";
export const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginLeft: "2.5%",
    width: "95%",
  },
  storeName: {
    fontWeight: "bold",
  },
  card2nd: {
    color: DARK_COLOR,
  },
  disabledCard: {
    backgroundColor: "grey",
  },
  orderContent: {
    marginLeft: "-5%",
  },
  icon: {
    fontSize: 30,
  },
});
