import { StyleSheet } from "react-native";

import { DARK_COLOR, LIGHT_COLOR } from "../../constants/index";
export const styles = StyleSheet.create({
  content: { flex: 1 },
  view: { backgroundColor: "white", flex: 1 },
  partnerName: {
    color: DARK_COLOR,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    flex: 1,
    height: "50%",
    paddingTop: "10%",
  },
  partnerAddress: {
    color: DARK_COLOR,
    width: "95%",
    marginLeft: "2.5%",
    textAlign: "center",
  },
  totalItem: { flex: 1 },
  totalItemText: { width: "100%", textAlign: "left" },
  totalItemNumber: { width: "100%", textAlign: "right" },
  destinationView: {
    flex: 1,
    marginTop: "5%",
    width: "95%",
    marginLeft: "2.5%",
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
