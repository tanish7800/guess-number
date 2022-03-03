import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MainButton = props => {
    return(
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.4} >
            <View style = {styles.button}>
                <Text style = {styles.buttonText} >{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        marginVertical:10,
        backgroundColor:'#83CC45',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius:25
    },
    buttonText:{
        color:'white',
        fontFamily:'ashery',
        fontSize:15
    }
});

export default MainButton;