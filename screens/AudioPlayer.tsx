import React, {useState, useEffect, useRef, useContext} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import Comments from '../components/Comments';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
import {graphqlOperation, API, Storage} from 'aws-amplify';
import { getStory } from '../src/graphql/queries';

import { AppContext } from '../AppContext';


const AudioPlayer  = ({navigation} : any) => {


//recieve story ID as props

const route = useRoute();
const {storyID} = route.params;

//use storyID to retrieve Story from AWS
const [Story, setStory] = useState();
const [AudioUri, setAudioUri] = useState('');

//send context to audio player
const { setStoryID } = useContext(AppContext);

const onPlay = () => {
    setStoryID(storyID);
}

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

  const Colors = {
    borderColor: 
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

    const animation = useRef(new Animated.Value(0)).current;

    const animatedColor = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['transparent', '#363636'],
        extrapolate: 'clamp',
        });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(Story?.time / 60000);
            let seconds = Math.floor((Story?.time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        } 


    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{uri: Story?.imageUri}}
                style={{ width: Dimensions.get('window').width, height: 320,  position: 'absolute'  }}
            >
            </ImageBackground>

            <Animated.View style={{ alignItems: 'center', backgroundColor: animatedColor, flexDirection: 'row', paddingTop: 25, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>
                
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={ [styles.button, {backgroundColor: '#363636a5', flexDirection: 'row'}]}>
                        <AntDesign 
                            name='close'
                            size={22}
                            color='#fff'
                            style={{
                                
                            }}
                            onPress={() => navigation.goBack() }
                        />
                    </View>
                    <Animated.Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', opacity: animatedOpacity}}>
                        {Story?.title}
                    </Animated.Text>
                </View>

                <TouchableOpacity onPress={onPlay}>
                    <Animated.View style={{marginHorizontal: 20, height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffff', borderRadius: 15, opacity: animatedOpacity}}>
                        <FontAwesome5 
                            name='play'
                            size={16}
                            color='#363636'
                            style={{
                                marginLeft: 2
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
                
            </Animated.View>

            <Animatable.View 
                animation='bounceInUp'
                style={{height: '104%'}}
                >
            <ScrollView 
                style={{height: '100%'}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: animation } } }],
                    { useNativeDriver: false }
                  )}
                scrollEventThrottle={1}
            >
            <View style={{ height: 220, backgroundColor: 'transparent'}}>

            </View>
            <LinearGradient 
                colors={['#202020', '#282828', '#000', '#000']}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20,paddingVertical: 5, paddingHorizontal: 20, flex: 5}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

            <View style={{ justifyContent: 'space-between', height: '100%'}}>
                <View style={{ margin: 20, alignItems: 'center'}}>
                    <Text style={styles.name}>
                        {Story?.title}
                    </Text>

                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
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
                        </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: '7755e914-9ae4-4dd0-a421-b517980b6808'})}>
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
                    </TouchableOpacity>
                 </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <View style={ styles.button}>
                            <FontAwesome 
                                name={isLiked ? 'star' : 'star-o'}
                                size={25}
                                color={isLiked ? 'gold' : 'white'}
                                onPress={onLikePress}
                                style={{ }}
                            />
                        </View>
                        <View style={ styles.button}>
                            <AntDesign 
                                name={isQ ? 'pushpin' : 'pushpino'}
                                size={25}
                                color={isQ ? 'cyan' : 'white'}
                                onPress={onQPress}
                                style={{ }}
                            />
                        </View>
                        <View style={ styles.button}>
                            <FontAwesome 
                                name='commenting-o'
                                size={25}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </View>
                        <View style={ styles.button}>
                            <FontAwesome 
                                name='share'
                                size={25}
                                color='white'
                                //onPress={}
                                style={{ }}
                            />
                        </View>
                    </View>


                    <View>
                        <TouchableOpacity onPress={onPlay}>
                            <View style={{paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 20, borderRadius: 30}}>
                                    <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                        Play
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{color: '#ffffffa5', fontSize: 18}}>
                            {millisToMinutesAndSeconds()}
                        </Text>
                    </View>

                    <View>
                        <View style={{marginTop: 40, marginBottom: 10,  marginHorizontal: -10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            
                                <Text style={[Colors, { fontSize: 16, textTransform: 'capitalize' }]}>
                                    {Story?.genre}
                                </Text>
                            
                                <Text style={{fontSize: 18, color: 'gold', fontWeight: 'bold' }}>
                                    69 %
                                </Text>
                            
                        </View>

                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>
                        <Text style={styles.highlight}>
                            {Story?.description}
                        </Text>

                    </View>
                
                    
                </View>


            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
                    <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                        Discussion
                    </Text>
                </View>
                
                
                <View>
                    <Comments storyId={Story?.id} />
                </View>
            
            </View>
            </View>
        </LinearGradient> 
        </ScrollView>
        </Animatable.View>
        <StatusBar style='light' backgroundColor='#0000004D' />
        </View>
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
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
        //paddingHorizontal: 12,
        //borderRadius: 15,
        //backgroundColor: '#rgba(69,69,69,0.2)',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
   
});

export default AudioPlayer;
