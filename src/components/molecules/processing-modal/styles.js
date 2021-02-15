import { StyleSheet } from "react-native";
import { DARK_COLOR, PROCESSING_MODAL_COLOR } from "../../../constants/index";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: PROCESSING_MODAL_COLOR,
    width: "75%",
    height: "40%",
    marginLeft: "12.5%",
    marginTop: "40%",
  },
  image: { width: "100%", height: "80%" },
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: DARK_COLOR,
  },
  button: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
});
