import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ResultsDetail from '../atoms/ResultsDetail';
import {withNavigation} from '@react-navigation/compat';

const ResultsList = ({ title, results, navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity onPress = {() => navigation.navigate('Result', {id: item.id, nameItem: item.name})}>
                            <ResultsDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5

    },

    container: {
        marginBottom: 10
    }
});

export default withNavigation(ResultsList);