import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import SearchBar from '../../components/atoms/SearchBar';
import useResults from '../../hooks/useResults';
import ResultsList from '../../components/molecules/ResultsList';

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
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>We have found {results.length}</Text>
            <ScrollView>
                <ResultsList 
                    results={filterResultsByPrice('$')} 
                    title="Cost Effective" 
                    
                />
                <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricer" />
                <ResultsList results={filterResultsByPrice('$')} title="Big Spender" />
            </ScrollView>


        </View>
    );

};

const styles = StyleSheet.create({

});


export default SearchScreen;



