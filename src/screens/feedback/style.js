import { StyleSheet } from "react-native";
import { DARK_COLOR } from "../../constants/index";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        height: "auto",
        marginTop: "20%",
    },
    drinkItem: {
        fontSize: 20,
    },
    message: {
        fontSize: 20,
        color: DARK_COLOR,
        fontWeight: "bold",
    },
    infoOrder: {
        width: "95%",
        alignItems: "center",
        marginTop: "5%",
    },
    rowContainer: {
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-evenly",
        marginTop: "5%",
    },

    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: "5%",
    },
    feedbackInput: {
        width: "95%",
        height: 150,
        borderWidth: 0.2,
        fontSize: 18,
        padding: "5%",
    },
});
