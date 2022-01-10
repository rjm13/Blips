import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, FlatList, RefreshControl} from 'react-native';
import { Audio } from 'expo-av';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, Portal, Provider } from 'react-native-paper';
import Slider from '@react-native-community/slider';

import { format, parseISO } from "date-fns";

import { useRoute } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the interval.
    useEffect(() => {
        function tick() {
        savedCallback.current();
        }
        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
    }, [delay]);
    }

const SimpleAudioPlayer = ({navigation} : any) => {

    const [SavedAudio, setSavedAudio] = useState()

    const route = useRoute();
    const {item} = route.params

    useEffect(() => {
        setSavedAudio(item)
    }, [])

      const [isSaved, setIsSaved] = useState(false);

      const [playItem, setPlayItem] = useState({
          title: '',
          time: '',
          audioUri: ''
      });

    //   useEffect(() => {
    //     const LoadKeys = async () => {
    //         let saved = await AsyncStorage.getAllKeys();
    
    //         if (saved != null) {
    //             let result = saved.filter((item) => item.includes("recording"));
    //             setSavedAudio(result);
    //         } 
    //     }
    //     LoadKeys();
    
    // }, [isSaved])

    useEffect(() => {
        let componentMounted = true;
        const fetchData = async () => {
            try {
                console.log('whats going on here')
                let object = await AsyncStorage.getItem(item);
                let objs = object ? JSON.parse(object) : null
                if(componentMounted) {
                    setPlayItem({
                        title: objs.title,
                        time: objs.time,
                        audioUri: objs.audioUri
                    })
            }
            } catch(e) {
                // read error
            }
            
        };
        fetchData();
        return () => {
        componentMounted = false;
        }
    }, []);


//Audio player

const [sound, setSound] = useState();

const [isPlaying, setIsPlaying] = useState(false);

const [position, setPosition] = useState(0); //position in milliseconds

const [slideLength, setSlideLength] = useState(0); //slide length

//slider functions
const SetPosition = (value) => {
    setPosition(value)
}

const StoryPosition = async (value) => { 
    await sound.setPositionAsync(value);
    setPosition(value);
}

const millisToMinutesAndSeconds = () => {
    let minutes = Math.floor(position / 60000);
    let seconds = ((position % 60000) / 1000);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
} 

const convertToTime = () => {
    let minutes = Math.floor(slideLength / 60000);
    let seconds = Math.floor((slideLength % 60000) / 1000);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}  

//audio play and pause control
    const PlayPause = async () => {

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            //{require(playItem.audioUri)},
            {uri: playItem.audioUri},
            {shouldPlay: true}
        );
        
        setSound(sound);


        let time = await sound.getStatusAsync();
        setSlideLength(time.durationMillis);

        if (isPlaying === false) {
            console.log('Playing Sound');
            await sound.playAsync(); 
            setIsPlaying(true);
            await sound.setPositionAsync(position);
        } 
        if (isPlaying === true) {
            await sound.pauseAsync();
            setIsPlaying (false);     
        }    
    }

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
        if (isPlaying === true && position >= slideLength) {
            setPosition(0);
            setIsPlaying(false)
        }
      }, 1000);

      useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); 
            //setPosition(0);
            //setIsPlaying(false);
        }
        : undefined;
    }, [sound]);

    // if (!Story) {
    //     return null;
    // }

    return (
        <View style={styles.container}>
            <View>
                <AntDesign 
                    name='close'
                    size={25}
                    color='#fff'
                    onPress={ () => navigation.goBack()}
                /> 
            </View>

            <View style={{ }}>
                <View style={{ alignItems: 'center', marginBottom: 80, marginTop: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>
                        {playItem.title}
                    </Text>
                </View>
                <View style={{alignSelf: 'center' }}>
                    <FontAwesome5 
                        name={isPlaying === true ? 'pause' : 'play'}
                        color='#ffffffCC'
                        size={40}
                        onPress={PlayPause}
                    />
                </View>

            </View>

                <View style={{ alignItems: 'center', marginTop: 30}}>
                    <Slider
                        style={{width: 300, height: 10}}
                        minimumTrackTintColor="cyan"
                        maximumTrackTintColor="#ffffffa5"
                        thumbTintColor='#fff'
                        //tapToSeek={true}
                        value={position}
                        step={1000}

                        minimumValue={0}
                        maximumValue={slideLength} //function set to the length of the audio file
                        onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                        onSlidingComplete={StoryPosition}
                    />
                
                <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                        {millisToMinutesAndSeconds()}
                    </Text>
                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                        {convertToTime()}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 30,
        paddingHorizontal: 20,
        paddingVertical: 60
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    textcounter: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold'
    }, button: {
        marginVertical: 10, 
        alignSelf: 'center', 
        width: '80%', 
        height: 60, 
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default SimpleAudioPlayer;