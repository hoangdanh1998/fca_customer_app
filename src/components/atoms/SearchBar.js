import React, {} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SearchBar = (props) => {
    return (
        <View style={styles.background}>
            
            <Icon name="search1"  style = {styles.iconStyle}/>
            <TextInput 
                style={styles.inputStyle} 
                value={props.term}
                onChangeText={newTerm => props.onTermChange(newTerm)}     
                placeholder="Search"
                autoCorrect= {false}
                autoCapitalize= 'none'
                onEndEditing = {props.onTermSubmit}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: "row", 
        marginTop: 10
    },
    inputStyle: {
        fontSize: 18,
        flex: 1
    }, 
    iconStyle: {
        fontSize: 35,
        alignSelf: "center"
    }
});


export default SearchBar;

