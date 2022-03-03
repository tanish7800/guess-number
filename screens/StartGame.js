import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback,ScrollView, Keyboard, Alert, Dimensions,KeyboardAvoidingView } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed , setConfirmed] = useState(false)
    const [selectedNumber , setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

    

    useEffect(()=>{
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width/4);
        };
    
        Dimensions.addEventListener('change',updateLayout);
        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        };
    });

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(chosenNumber <= 0 || chosenNumber > 99 ){ 
            Alert.alert("Invalid Number!", "Number should lie between 0 and 99.", [{text:'Okay',sylte:'destructive', onPress:resetInputHandler}] );
            return;
        }
        if(isNaN(chosenNumber)){
            Alert.alert("No Number Entered","Please Enter A Number between 0 and 99.", [{text:'Okay',sylte:'destructive', onPress:resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        //console.log(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput ;

    if(confirmed){
        confirmedOutput = 
            <Card style={styles.chosen}>
                <Text style={styles.chosenText} >You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <View style={styles.startButton}><MainButton  color='#03460E' onPress={()=>props.onStartGame(selectedNumber)}>START GAME</MainButton></View>
            </Card>
    };

    return (
        <ScrollView>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30} >
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}} >
            <View style = { styles.screen }>
                <Card style={ styles.inputContainer } >
                    <Text style = { styles.text } >Enter A Number</Text>
                    <Input style = { styles.input } blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                    <View style = { styles.buttonContainer } >
                        <View style = {{width:buttonWidth}} ><Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} /></View>
                        <View style = {{width:buttonWidth}} ><Button title="Confirm" onPress={confirmInputHandler} color={Colors.secondary}/></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center',
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold',
        fontWeight:'bold'
    },
    inputContainer:{
        width:'80%',
        maxWidth:'95%',
        minWidth:300,
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding: 10
    },
    text:{
        fontFamily:"open-sans-bold",
        fontSize:20,
    },
    // button:{
    //     width:Dimensions.get('window').width / 4 ,

    // },
    input:{
        width: 50,
        textAlign:'center'
    },
    chosen:{
        padding:10,
        marginVertical:10,
        width: 200,
        alignItems:'center'
    },
    startButton:{
        width:'80%',
        marginVertical:10
    },
    chosenText:{
        fontWeight:'bold',
        fontFamily:'open-sans-bold',
        fontSize: 18,
        marginVertical: 8
    }
});

export default StartGameScreen;