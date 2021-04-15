import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"red"
    },
    form: {
        width:"100%",
        alignItems: 'center',
        alignSelf: "center",
        // backgroundColor:"red",
    },
    title: {
        fontSize: 20
    },
    infoOrder: {
        borderWidth: 0.2,
        width: "95%",
        alignItems:"center",
        paddingVertical: 20,
        marginVertical:20
    },
    rowContainer: {
        flexDirection:"row",
        width:"70%",
        justifyContent: "space-evenly",
        // backgroundColor:"red"
    },

    inputContainer: {
        width:"100%",
        // backgroundColor: "red",
        alignItems: "center",
    },
    feedbackInput: {
        width:"95%",
        // backgroundColor:"yellow",
        height: 150,
        borderWidth:0.2,
        fontSize: 20,
        padding:10,
        marginVertical: 20
        
    }
})