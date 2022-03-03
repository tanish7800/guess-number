import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style = {{...styles.card, ...props.style}} >{props.children}</View>
};

const styles = StyleSheet.create({
    card:{
        shadowColor: '#4F534A',
        shadowRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: {width:0, height:2},
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 20,
    }
});

export default Card;