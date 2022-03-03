import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { elementsThatOverlapOffsets } from 'react-native/Libraries/Lists/VirtualizeUtils';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const GameOverScreen = props => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

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

    return (
        <SafeAreaProvider>
            <ScrollView>
                <View style={styles.screen} > 
                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/success.png')}
                            //source={{uri:'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
                            style={styles.image} 
                            resizeMode="cover" 
                            fadeDuration={1000}
                        />
                    </View>
                    <BodyText>Your phone needed <Text style={styles.highlight}>{props.roundNumber}</Text> rounds to guess <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
                    <MainButton onPress={props.onRestart}>START NEW GAME</MainButton>
                </View>
            </ScrollView>  
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 20,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10
    },
    text:{
        fontFamily:'open-sans-bold',
        fontSize:15
    },
    imageContainer:{
        height:Dimensions.get('window').width * 0.8,
        width:Dimensions.get('window').width * 0.8,
        borderRadius:(Dimensions.get('window').width * 0.8)/2,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height / 30
    },
    image:{
        width:'100%',
        height:'100%'
    },
    highlight:{
        color: Colors.secondary,
        fontFamily:'ashery'
    }
});

export default GameOverScreen;