import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
// import {graphqlOperation, API, Storage} from 'aws-amplify';
// import { getStory } from '../src/graphql/queries';

import { useNavigation } from '@react-navigation/native'


function useInterval(callback, delay) {
    const savedCallback = useRef();
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    
    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
        savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
    }

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

const AudioPlayer  = () => {

    //const navigation = useNavigation();

//minimize the audio player with animations
    const [isExpanded, setIsExpanded] = useState(false);

    const animation = useRef(new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })).current;

    const onChangeHandler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            Animated.spring(animation.y, {
                toValue: -SCREEN_HEIGHT + 120,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } else if (!isExpanded) {
            setIsExpanded(true);
            Animated.spring(animation.y, {
                toValue: SCREEN_HEIGHT - 90,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } 
    }

    const animatedHeight = {
        transform: animation.getTranslateTransform(),
    };
  
    const animatedImageHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [180, 32],
    extrapolate: 'clamp',
    });


    const animatedSongTitleOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    });

    const animatedImageMarginLeft = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [SCREEN_WIDTH / 2 - 100, 10],
    extrapolate: 'clamp',
    });

    const animatedHeaderHeight = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: [SCREEN_HEIGHT / 2, 60],
    extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT - 0, 60],
      extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [-690, 690],
      extrapolate: 'clamp',
      });

    const animatedSongDetailsOpacity = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
    });

    const animatedBackgroundColor = animation.y.interpolate({
    inputRange: [0, SCREEN_HEIGHT - 90],
    outputRange: ['rgba(0,0,0,0.5)', 'white'],
    extrapolate: 'clamp',
    });


//recieve story ID as props

// const route = useRoute();
// const {storyID} = route.params;

const {storyID} = 'a367684b-9d1f-49aa-b767-457773446309'

//use storyID to retrieve Story from AWS
const [Story, setStory] = useState();
const [AudioUri, setAudioUri] = useState('');

useEffect(() => {

    const fetchStory = async () => {
      
      try {
        const storyData = await API.graphql(graphqlOperation(
          getStory, {id: storyID}))
          if (storyData) {
            setStory(storyData.data.getStory);
            const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, expiration: 604800});
            setAudioUri(response);
            console.log(AudioUri);
          }
      } catch (e) {
        console.log(e);
      }
    }

    fetchStory();

  }, [storyID])

  const BackgroundColors = {
    backgroundColor: 
            Story?.genre === 'crime' ? '#cac715' : 
            Story?.genre === 'fantasy' ? '#15ca54' :
            Story?.genre === 'suspense' ? '#1579ca' :
            Story?.genre === 'comedy' ? '#ff9ce6' :
            Story?.genre === 'science fiction' ? '#c97f8b' :
            Story?.genre === 'life & adventure' ? '#15b8ca' :
            Story?.genre === 'fan fiction' ? '#a05ebf' :
            Story?.genre === 'after dark' ? '#5b6ade' : 
            '#363636'
    }


//audio player
    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0);

//like state
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };
//queueing the story
    const [isQ, setQd] = useState(false);
    
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
        }
        if ( isQ === true ) {
            setQd(false);
        }  
    };

    function SetPosition(value) {
        setPosition(value)
    }

    async function StoryPosition (value) { 
        await sound.setPositionAsync(value);
        setPosition(value);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(position / 60000);
        let seconds = ((position % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 
    
    function convertToTime () {
        let minutes = Math.floor(slideLength / 60000);
        let seconds = Math.floor((slideLength % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  


    async function PlayPause() {


        console.log('Loading Sound');
        console.log(Story);
        const { sound } = await Audio.Sound.createAsync(
            {uri: AudioUri},
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

    // useEffect(() => {
    //     PlayPause();
    // }, []);

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
      }, 1000);
    

    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);




    return (
        <Animated.View
          style={[
            animatedHeight,
            {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: animatedBottom,
                justifyContent: 'space-between',
                alignContent: 'space-between',
                height: SCREEN_HEIGHT,
            },
          ]}>

            <Animated.View style={{
                height: animatedImageHeight,
                width: animatedImageHeight,
                marginLeft: animatedImageMarginLeft,
            }}>
                <ImageBackground 
                    source={{uri: Story?.imageUri}}
                    style={{ width: '100%', height: '110%', flex: 3,  }}
                >
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20}}>
                        <View style={ styles.button}>
                            <AntDesign 
                                name='close'
                                size={22}
                                color='#fff'
                                style={{
                                    
                                }}
                                onPress={() => navigation.goBack() }
                            />
                        </View>
                        
                        <View style={{ }}>
                            <View style={ styles.button}>
                                <FontAwesome 
                                    name={isLiked ? 'star' : 'star-o'}
                                    size={22}
                                    color={isLiked ? 'gold' : 'white'}
                                    onPress={onLikePress}
                                    style={{ }}
                                />
                            </View>
                            <View style={ styles.button}>
                                <AntDesign 
                                    name={isQ ? 'pushpin' : 'pushpino'}
                                    size={22}
                                    color={isQ ? 'cyan' : 'white'}
                                    onPress={onQPress}
                                    style={{ }}
                                />
                            </View>
                            <View style={ styles.button}>
                                <FontAwesome 
                                    name='commenting-o'
                                    size={22}
                                    color='white'
                                    //onPress={}
                                    style={{ }}
                                />
                            </View>
                            <View style={ styles.button}>
                                <FontAwesome 
                                    name='share'
                                    size={22}
                                    color='white'
                                    //onPress={}
                                    style={{ }}
                                />
                            </View>
                        </View>
                        
                    </View>
                </ImageBackground>
            </Animated.View>

            <Animated.View 
                    style={{height: animatedBoxHeight}}
                >
                    <LinearGradient 
                        colors={['#2f2179','black', '#000']}
                        style={{ borderRadius: 20, paddingVertical: 5, paddingHorizontal: 20, flex: 5}}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                
                <View style={{ justifyContent: 'space-between', height: '100%'}}>
                    
                    <View style={{ margin: 20, alignItems: 'center'}}>
                        <Text style={styles.name}>
                            {Story?.title}
                        </Text>

                        <TouchableWithoutFeedback onPress={onChangeHandler}>
                            <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
                                        color='#ffffffCC'
                                        size={15}
                                        style={{ marginRight: 10}}
                                    />
                                    <Text style={styles.username}>
                                        {Story?.writer}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-reader'
                                        color='#ffffffCC'
                                        size={15}
                                        style={{ marginRight: 10}}
                                    />
                                    <Text style={styles.username}>
                                        {Story?.narrator}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <View>
                            <View style={{marginTop: 5, marginBottom: 20,}}>
                                <View style={[BackgroundColors, {borderRadius: 15,paddingVertical: 5, paddingHorizontal: 20}]}>
                                    <Text style={{ fontSize: 16, textTransform: 'capitalize' }}>
                                        {Story?.genre}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                    </View>

                        <View style={{ marginTop: 0, alignSelf: 'center' }}>
                            <FontAwesome5 
                                name={isPlaying === true ? 'pause' : 'play'}
                                color='#ffffffCC'
                                size={50}
                                onPress={PlayPause}
                            />
                        </View>

                        <View style={styles.footer}>
                            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                    {millisToMinutesAndSeconds()}
                                </Text>
                                <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                    {convertToTime()}
                                </Text>
                            </View>
                            <View>
                                <Slider
                                    style={{width: 320, height: 10}}
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
                            </View>
                        </View>
                    </View>
                </LinearGradient> 
            </Animated.View>
        <StatusBar style='light' backgroundColor='#0000004D' />
        </Animated.View>
    );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'space-between',
        alignContent: 'space-between',
        height: Dimensions.get('window').height
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -20,
        color: '#ffffffCC',
        fontSize: 14,
        padding: 12,
        borderRadius: 15,
        backgroundColor: '#rgba(69,69,69,0.2)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636a5',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
});

export default AudioPlayer;
