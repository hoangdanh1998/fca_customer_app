import React, { useState } from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Button, Footer, Textarea } from 'native-base'
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FocusedButton from "../../components/atoms/focused-button/index";
import { DARK_COLOR } from '../../constants';

export default function FeedBackScreen(props) {

    const [colorIconDislike, setColorIconDislike] = useState("#000");
    const [colorIconLike, setColorIconLike] = useState("#000");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="height"
            enabled
        >
            <TouchableWithoutFeedback>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ backgroundColor: "#fff" }}
                >
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <View style={{ marginTop: 40 }}>
                                <Text style={styles.title}>
                                    Bạn thấy thức uống hôm nay thế nào?
                                    </Text>
                            </View>
                            <View style={styles.infoOrder}>
                                <Text style={{ fontSize: 23, fontWeight: "bold" }}>Cà phê sân vườn Mimosa</Text>
                                <Text style={styles.title}>Cà phê sữa</Text>
                                <Text style={styles.title}>Cacao sữa</Text>
                            </View>
                            <View style={[styles.rowContainer]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setColorIconDislike("red");
                                        setColorIconLike("#000")
                                    }}

                                >
                                    <AntDesign
                                        size={55}
                                        name="dislike2"
                                        color={colorIconDislike}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setColorIconLike("green");
                                        setColorIconDislike("#000");

                                    }}
                                >
                                    <AntDesign
                                        size={55}
                                        name="like2"
                                        color={colorIconLike}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.inputContainer]}>
                                <Textarea
                                    multiple={true}
                                    style={styles.feedbackInput}
                                    textAlignVertical="top"
                                    numberOfLines={5}
                                    placeholder="Góp ý"
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                />
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <Footer style={{ backgroundColor: "white" }}>
                <View style={{width:"100%"}}>
                    <Button style={{width:"100%", textAlign:"center", backgroundColor: DARK_COLOR}}>
                        <Text style = {{textAlign:"center", width:"100%", fontSize:20, color:"#fff", fontWeight: "bold" }}>
                            Gửi
                        </Text>
                    </Button>
                </View>
            </Footer>
        </KeyboardAvoidingView>
    )
}
