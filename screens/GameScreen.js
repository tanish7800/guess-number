import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value,numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const [pastGuesses, setPastGuesses]=useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice , onGameOver } = props;

    useEffect( () => {
        const updateLayout = () => {
            
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change',updateLayout)

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
    } );

    useEffect( () => {
        if(currentGuess===props.userChoice){
            props.onGameOver(pastGuesses.length);
        }
    } ,[currentGuess, userChoice, onGameOver] );

    const nextGuessHandler = direction => {
            if((direction==='lower' && currentGuess < props.userChoice) ||
             (direction === 'higher' && currentGuess > props.userChoice)){
                Alert.alert('Don\'t Cheat','You know this is wrong ...',[{text:'Sorry!', type: 'cancel'}
            ]);
            return;
        }

        if(direction === 'lower' ){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess+1;
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [ nextNumber , ...curPastGuesses])

    };

    let listContainerStyle = styles.listContainer;

    if(availableDeviceWidth<350){
        listContainerStyle=styles.listContainerBig;
    }

    if(availableDeviceHeight<500){
        return(
            <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
                <View style = {styles.controls} >
                    <MainButton  onPress = {nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="ios-arrow-down-circle-outline" size={40} color="white"/>
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer> 
                    <MainButton  onPress = {nextGuessHandler.bind(this,'higher')} >
                        <Ionicons name="ios-arrow-up-circle-outline" size={40} color="white"/>
                    </MainButton>
                </View>
            <View style={listContainerStyle}>
                <ScrollView contentContainerStyle={styles.list}> 
                    {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length-index))}
                </ScrollView>
            </View>
        </View>
        );
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttoncard} > 
                <MainButton  onPress = {nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="ios-arrow-down-circle-outline" size={40} color="white"/>
                </MainButton>
                <MainButton  onPress = {nextGuessHandler.bind(this,'higher')} >
                    <Ionicons name="ios-arrow-up-circle-outline" size={40} color="white"/>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                <ScrollView contentContainerStyle={styles.list}> 
                    {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length-index))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttoncard:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:Dimensions.get('window').height > 600 ? 10 : 5,
        width:300,
        maxWidth:'80%'
    },
    listContainer:{
       flex:1,
       width:Dimensions.get('window').width * 0.95
    },
    listContainerBig:{
        flex:1,
        width:'80%'
     },
    controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'80%'
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding: 15,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'60%'
    },
    list:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    }
});

export default GameScreen;