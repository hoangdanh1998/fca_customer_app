import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import  MapScreen  from "../map/google-map";
import ResultsList from '../../components/molecules/ResultsList';
import SearchBar from '../../components/atoms/SearchBar';
import useResults from '../../hooks/useResults';

const SearchScreen = () => {

    const [errorMessage, results, searchApi] = useResults();
    const [term, setTerm] = useState('');

    const filterResultsByPrice = price => {
        //price === '$' or === '$$'' or === '$$$'
        return results.filter(results => {
            return results.price === price;
        });
    };

    return (
        <View style = {{flex: 1}}>
            <MapScreen/>
        </View>
    );

};

const styles = StyleSheet.create({

});


export default SearchScreen;



