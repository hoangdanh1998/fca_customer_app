import { StyleSheet } from 'react-native';
import { DARK_COLOR } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "space-evenly",
        alignItems: "center",
        // marginTop: "50%"
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
    codePhone: {
        marginLeft:10,
        fontSize:22,
        fontWeight: "bold",
    },
    logo: {
        width: 500,
        height: 300,
        resizeMode: "stretch"
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
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        marginTop:20
    },

    errContainer: {
        width: "70%"
    },
    errorMessage: {
        color:"red",
        fontSize:18
    }
    
})

