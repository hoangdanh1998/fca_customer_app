import { StyleSheet } from "react-native";

import { DARK_COLOR, LIGHT_COLOR } from "../../constants/index";
export const styles = StyleSheet.create({
  content: { flex: 1 },
  title: {
    color: DARK_COLOR,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    flex: 1,
    height: "50%",
    paddingTop: "10%",
  },
  footer: {
    height: "auto",
    backgroundColor: "white",
    borderColor: LIGHT_COLOR,
  },
  cardContent: {
    width: "95%",
    marginLeft: "2.5%",
  },
  address: {
    flex: 4,
    marginTop: "5%",
  },
  store: {
    flex: 6,
    marginTop: "5%",
  },
});
