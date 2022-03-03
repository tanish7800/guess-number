import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return(
        <View style={styles.header} >
            <Text style={styles.headerTitle} >{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'ios' ? Colors.primary : Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle:{
        color:'white',
        fontSize: 25,
        fontFamily: 'ms',
    }
});

export default Header;