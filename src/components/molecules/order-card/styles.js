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
    // color: DARK_COLOR,
  },
  orderInformation: {
    flex: 1,
    paddingTop: "1%",
  },
  card1st: {
    // backgroundColor: "#e6d7ab",
  },
  orderStatus: {
    marginLeft: "-5%",
  },
  card2nd: {
    paddingTop: "0%",
    color: DARK_COLOR,
    // backgroundColor: "#e6d7ab",
  },
  orderContent: {
    marginLeft: "-5%",
  },
  icon: {
    // color: DARK_COLOR,
    fontSize: 30,
  },
});
