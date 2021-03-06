import { StyleSheet } from 'react-native';
import { DARK_COLOR } from '../../constants/index';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "space-evenly",
        alignItems: "center",


    },

    logo: {
        width: 500,
        height: 400,
        resizeMode: "stretch"
    },

    form: {
        // marginTop: 15,

    },
    inputForm: {
        flexDirection: "row",
        width: "70%",

        borderBottomWidth: 1,
        borderBottomColor: DARK_COLOR,
        paddingBottom: 5
    },

    titleText: {
        fontSize: 20,
        color: DARK_COLOR
    },

    textInput: {
        // flex: 1,
        width: "84%",
        fontSize: 20,
        paddingLeft: 10,

    },
    button: {
        width: 175,
        backgroundColor: DARK_COLOR,
        borderRadius: 30,
        padding: 10,
        elevation: 2,
        alignItems: "center",
    },
    textButton: {
        color: "#fff"
    },

    text: {
        fontSize: 20
    },
    boldText: {
        fontWeight: "bold"
    },

    buttonBody: {
        width: "69%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15

    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        color: "red",
        marginTop: 10,
        fontSize: 18,
    },
})