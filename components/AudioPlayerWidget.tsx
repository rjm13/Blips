import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Animated, PanResponder, Image, ScrollView } from 'react-native';
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
// import {graphqlOperation, API, Storage} from 'aws-amplify';
// import { getStory } from '../src/graphql/queries';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const AudioPlayer  = () => {

    const [isScrollEnabled, setIsScrollEnabled] = useState(true);

    const [scrollOffset, setScrollOffset] = useState(0);

    //const scrollOffset = useRef(0);

    //const animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 });
   const animation = useRef(new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })).current;

    const panResponder = useRef(
        PanResponder.create({
            //onStartShouldSetPanResponder: (evt, gestureState) => true,
            //onStartShouldSetPanResponderCapture: (evt, gestureState) => true, 
            //onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (
                    (isScrollEnabled &&
                        scrollOffset <= 0 &&
                        gestureState.dy > 0) ||
                    (!isScrollEnabled && gestureState.dy < 0)
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            onPanResponderGrant: () => {
                animation.extractOffset();
            },
            onPanResponderMove: (evt, gestureState) => {
                animation.setValue({ x: 0, y: gestureState.dy });
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.moveY > SCREEN_HEIGHT - 90) {
                    Animated.spring(animation.y, {
                        toValue: 0,
                        tension: 1,
                        //duration: 200,
                        useNativeDriver: false,
                    }).start();
                } else if (gestureState.moveY <90) {
                    Animated.spring(animation.y, {
                        toValue: 0,
                        tension: 1,
                        //duration: 200,
                        useNativeDriver: false,
                    }).start();
                } else if (gestureState.dy < 0) {
                    setIsScrollEnabled(true);
                    Animated.spring(animation.y, {
                        toValue: -SCREEN_HEIGHT + 90,
                        tension: 1,
                        //duration: 200,
                        useNativeDriver: false,
                    }).start();
                } else if (gestureState.dy > 0) {
                    setIsScrollEnabled(false);
                    Animated.spring(animation.y, {
                        toValue: SCREEN_HEIGHT - 90,
                        tension: 1,
                        //duration: 200,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    )

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
    outputRange: [SCREEN_HEIGHT / 2, 90],
    extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT - 0, 60],
      extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [-5, 690],
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

    
  console.log(panResponder.current)

    return (
        
        // <Animated.View
        // style={{flex: 1, backgroundColor: animatedBackgroundColor }}>
        <Animated.View
          {...panResponder.current.panHandlers}
          style={[
            animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: animatedBottom,
              //flex: 1,
              //zIndex: 10,
              backgroundColor: '#ffffffa5',
              //height: SCREEN_HEIGHT,
              height: animatedBoxHeight,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
          ]}>
          <ScrollView
            style={{  }}
            scrollEnabled={isScrollEnabled}
            scrollEventThrottle={16}        
            onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}>
            <Animated.View
              style={{
                height: animatedHeaderHeight,
                //borderTopWidth: 1,
                //borderTopColor: '#ebe5e5',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View
                  style={{
                    height: animatedImageHeight,
                    width: animatedImageHeight,
                    marginLeft: animatedImageMarginLeft,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                    }}
                    source={{ uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'}}
                  />
                </Animated.View>
                <Animated.Text
                  style={{
                    opacity: animatedSongTitleOpacity,
                    fontSize: 18,
                    paddingLeft: 10,
                  }}>
                  Hotel California(Live)
                </Animated.Text>
              </View>
              <Animated.View
                style={{
                  opacity: animatedSongTitleOpacity,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Ionicons name="pause" size={32} />
                <Ionicons name="play" size={32} />
              </Animated.View>
            </Animated.View>

            <Animated.View
              style={{
                height: animatedHeaderHeight,
                opacity: animatedSongDetailsOpacity,
              }}>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                  Hotel California (Live)
                </Text>
                <Text style={{ fontSize: 18, color: '#fa95ed' }}>
                  Eagles - Hell Freezes Over
                </Text>
              </View>

              <View
                style={{
                  height: 40,
                  width: SCREEN_WIDTH,
                  alignItems: 'center',
                }}>
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={18}
                />
              </View>

              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Ionicons name="caret-back-outline" size={40} />
                <Ionicons name="pause" size={50} />
                <Ionicons name="caret-forward" size={40} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                <Ionicons
                  name="add"
                  size={32}
                  style={{ color: '#fa95ed' }}
                />
                <Ionicons
                  name="disc"
                  size={32}
                  style={{ color: '#fa95ed' }}
                />
              </View>
            </Animated.View>
            
          </ScrollView>
        </Animated.View>
      //</Animated.View>
    );
}

const styles = StyleSheet.create ({
    container: {
        
    },
   
});

export default AudioPlayer;
