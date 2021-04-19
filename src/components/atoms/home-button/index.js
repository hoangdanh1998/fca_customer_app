import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LIGHT_COLOR } from '../../../constants';

export default function HeaderHomeButton(props) {
    return (
        <TouchableOpacity style={{paddingRight:10}} 
            onPress={props.onPress}
        >
            <AntDesign 
                name= "home"
                size={25}
                color= {LIGHT_COLOR}
            />
        </TouchableOpacity>
    )
}