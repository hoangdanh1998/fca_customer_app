import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../../service/yelp-api/yelp';


const ResultShowScreen = ({route}) => {
    const id = route.params?.id;
    const [result, setResult] = useState(null);

    const getResult = async id => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };

    useEffect(() => {
        getResult(id);
    }, [])

    if (!result) {
        return null;
    }

    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList 
                horizontal
                data= {result.photos}
                keyExtractor = {photo => photo}
                style = {styles.listPhoto}
                renderItem = {({item}) => {
                    return (
                        <Image style={styles.image} source = {{uri: item}}/>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        margin: 5,
        
    },
    listPhoto: {
        // alignItems: "center"
    }
});

export default ResultShowScreen;
