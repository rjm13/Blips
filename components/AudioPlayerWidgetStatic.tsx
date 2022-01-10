import React, {useState, useEffect, useRef, useContext} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Animated, TouchableOpacity, PanResponder, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
import {graphqlOperation, API, Storage} from 'aws-amplify';
import { getStory } from '../src/graphql/queries';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { AppContext } from '../AppContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

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

const AudioPlayer  = () => {

//get context for storyID
const { storyID } = useContext(AppContext);
const { setStoryID } = useContext(AppContext);





//minimize the player with animations
    const [isExpanded, setIsExpanded] = useState(true);

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
        outputRange: [SCREEN_WIDTH/1.2, 0],
        extrapolate: 'clamp',
        });
        
    const animatedImageWidth = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH, 0],
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

    const animatedHeaderHeightMinimized = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    const animatedButtonLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -80],
        extrapolate: 'clamp',
    });

    const animatedButtonRight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -300],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightSmall = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT - 240, 60],
        extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [-610, 690],
        extrapolate: 'clamp',
      });

    const animatedSongDetailsOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [1, 0.5, 0.5],
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

//use storyID to retrieve Story from AWS
const [Story, setStory] = useState(null);
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
            setPosition(0);
          }
      } catch (e) {
        console.log(e);
      }
    }

    fetchStory();

  }, [storyID])

//background colors for the genre indicator
    const Colors = {
        color: 
            Story?.genre === 'adventure' ? '#27d995' :
            Story?.genre === 'comedy' ? '#ff9ce6' :
            Story?.genre === 'crime' ? '#cac715' : 
            Story?.genre === 'fan fiction' ? '#c92ad1' :
            Story?.genre === 'fantasy' ? '#15ca54' :
            Story?.genre === 'horror' ? '#1579ca' :
            Story?.genre === 'life' ? '#15b8ca' :
            Story?.genre === 'love' ? '#f05161' :
            Story?.genre === 'mystery' ? '#ff6f00' :
            Story?.genre === 'science fiction' ? '#c97f8b' :
            Story?.genre === 'after dark' ? '#7081ff' : 
            '#ffffffa5',
        }

//audio player
const [sound, setSound] = useState();

const [isPlaying, setIsPlaying] = useState(false);

const [position, setPosition] = useState(0); //position in milliseconds

const [slideLength, setSlideLength] = useState(0); //slide length

const onClose = () => {
    setStoryID(null);
    setStory(null);
}

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

//slider functions
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

//audio play and pause control
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
    //     if (Story) {
    //     PlayPause(); }
    // }, [Story]);

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

    if (!Story) {
        return null;
    }


    return (

    <View>
        <Animated.View
            style={{
            height: animatedImageHeight,
            width: animatedImageWidth,
            //marginLeft: animatedImageMarginLeft,
            position: 'absolute',
            bottom: 460,
            }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                    backgroundColor: '#363636'
                }}
                source={{uri: Story?.imageUri}}
            >
            { isExpanded === false ? (
                <Animated.View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20}}>
                    <TouchableOpacity onPress={onClose}>
                        <Animated.View style={ [styles.button, {left: -20}]}>
                            <AntDesign 
                                name='close'
                                size={22}
                                color='#fff'
                                style={{
                                    
                                }}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    
                    <View style={{ }}>
                        <Animated.View style={ [styles.button, {right: -20}]}>
                            <FontAwesome 
                                name={isLiked ? 'star' : 'star-o'}
                                size={22}
                                color={isLiked ? 'gold' : 'white'}
                                onPress={onLikePress}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: -20}]}>
                            <AntDesign 
                                name={isQ ? 'pushpin' : 'pushpino'}
                                size={22}
                                color={isQ ? 'cyan' : 'white'}
                                onPress={onQPress}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: -20}]}>
                            <FontAwesome 
                                name='commenting-o'
                                size={22}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </Animated.View>
                        <Animated.View style={ [styles.button, {right: -20}]}>
                            <FontAwesome 
                                name='share'
                                size={22}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </Animated.View>
                    </View>  
                </Animated.View>
            ) : null } 
            </ImageBackground>
        </Animated.View>

        <Animated.View
          style={[
            animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: animatedBottom,
              //zIndex: 10,
              height: animatedBoxHeight,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
          ]}>
                <LinearGradient 
                    colors={[isExpanded ? '#171c2b' : '#3b4b80', isExpanded ? '#171c2b' : '#000', isExpanded ? '#171c2bD9' : '#000']}
                    style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, flex: 1}}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                >

                    
                        <Animated.View style={{ height: animatedHeaderHeightSmall, flexDirection: 'row', alignItems: 'center', }}>
                            { isExpanded === true ? (
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <TouchableWithoutFeedback onPress={onChangeHandler}>
                                        <Animated.Text
                                            style={{
                                                opacity: animatedSongTitleOpacity,
                                                fontSize: 18,
                                                paddingLeft: 20,
                                                color: '#fff',
                                        }}>
                                            {Story?.title}
                                        </Animated.Text>
                                    </TouchableWithoutFeedback>
                                        <Animated.View
                                            style={{
                                                opacity: animatedSongTitleOpacity,
                                        }}>
                                            <FontAwesome5 
                                                    name={isPlaying === true ? 'pause' : 'play'}
                                                    color='#ffffffCC'
                                                    size={20}
                                                    style={{ paddingHorizontal: 40,}}
                                                    onPress={PlayPause}
                                            />
                                        </Animated.View>
                                    </View> 
                            ) : null } 
                        </Animated.View>
                    
{/* Expanded View elements */}
            <Animated.View
                style={{
                    height: animatedHeaderHeightMinimized,
                    opacity: animatedSongDetailsOpacity,
            }}>
                { isExpanded === false ? (
                    <View style={{ justifyContent: 'space-between', height: '60%'}}>
                        <View>
                            <TouchableWithoutFeedback onPress={onChangeHandler}>
                                <View style={{ alignItems: 'center',  marginHorizontal: 40, marginVertical: 20, }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10,justifyContent: 'space-between'}}>
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
                                </View>  
                            </TouchableWithoutFeedback>

                            <View style={{ alignItems: 'center', marginHorizontal: 20}}>
                                <View style={{marginTop: 10,}}>
                                    <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: 300}]}>
                                        <Text style={[Colors, { fontSize: 16, textTransform: 'capitalize' }]}>
                                            {Story?.genre}
                                        </Text>
                                        <Text style={{fontSize: 18, color: 'gold', fontWeight: 'bold' }}>
                                            69 %
                                        </Text>
                                    </View>
                                </View>
                                <ScrollView style={{ height: 140, marginTop: 10 }}>
                                    <Text style={styles.highlight}>
                                        {Story?.description}
                                    </Text>
                                </ScrollView>
                                
                            </View>
                        </View>
                        
                        <View>
                            <View style={{alignSelf: 'center' }}>
                                <FontAwesome5 
                                    name={isPlaying === true ? 'pause' : 'play'}
                                    color='#ffffffCC'
                                    size={50}
                                    onPress={PlayPause}
                                />
                            </View>

                            <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                    {millisToMinutesAndSeconds()}
                                </Text>
                                <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                    {convertToTime()}
                                </Text>
                            </View>

                            <View style={{ alignItems: 'center'}}>
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
                ) : null } 
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        
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
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    highlight: { 
        color: '#ffffffCC',
        fontSize: 14,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#363636CC',
    },
   
});

export default AudioPlayer;
