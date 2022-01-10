import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import genres from '../../data/dummygenre';

import DATA from '../../data/dummyaudio';
import {useNavigation, useRoute} from '@react-navigation/native';
// import { listStorys } from '../../src/graphql/queries';
// import {graphqlOperation, API, Auth} from 'aws-amplify';

import { AppContext } from '../../AppContext';

import GenreColors from '../../constants/GenreColors';

const Item = ({title, genre, description, imageUri, audioUri, writer, narrator, time, id} : any) => {   

    const { setStoryID } = useContext(AppContext);

    const onPlay = () => {
        setStoryID(id);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    const Colors = {
        color: 
            genre === 'adventure' ? '#27d995' :
            genre === 'comedy' ? '#ff9ce6' :
            genre === 'crime' ? '#cac715' : 
            genre === 'fan fiction' ? '#c92ad1' :
            genre === 'fantasy' ? '#15ca54' :
            genre === 'horror' ? '#1579ca' :
            genre === 'life' ? '#15b8ca' :
            genre === 'love' ? '#f05161' :
            genre === 'mystery' ? '#ff6f00' :
            genre === 'science fiction' ? '#c97f8b' :
            genre === 'after dark' ? '#7081ff' : 
            '#ffffffa5',
        borderColor: 
            genre === 'adventure' ? '#27d995' :
            genre === 'comedy' ? '#ff9ce6' :
            genre === 'crime' ? '#cac715' : 
            genre === 'fan fiction' ? '#c92ad1' :
            genre === 'fantasy' ? '#15ca54' :
            genre === 'horror' ? '#1579ca' :
            genre === 'life' ? '#15b8ca' :
            genre === 'love' ? '#f05161' :
            genre === 'mystery' ? '#ff6f00' :
            genre === 'science fiction' ? '#c97f8b' :
            genre === 'after dark' ? '#7081ff' : 
            '#ffffffa5',
      }

      const BackgroundColors = {
        backgroundColor: 
            genre === 'adventure' ? '#27d995' :
            genre === 'comedy' ? '#ff9ce6' :
            genre === 'crime' ? '#cac715' : 
            genre === 'fan fiction' ? '#c92ad1' :
            genre === 'fantasy' ? '#15ca54' :
            genre === 'horror' ? '#1579ca' :
            genre === 'life' ? '#15b8ca' :
            genre === 'love' ? '#f05161' :
            genre === 'mystery' ? '#ff6f00' :
            genre === 'science fiction' ? '#c97f8b' :
            genre === 'after dark' ? '#7081ff' : 
            '#ffffffa5',
        }

    const navigation = useNavigation();

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


    return (
        <View style={styles.containernew}>
            <View style={{ position: 'absolute', alignSelf: 'center', top: 60, backgroundColor: 'transparent'}}>
                <FontAwesome5 
                    name={
                        genre === 'crime' ? 'shoe-prints' : 
                        genre === 'fantasy' ? 'hat-wizard' :
                        genre === 'suspense' ? 'user-secret' :
                        genre === 'comedy' ? 'poo' :
                        genre === 'science fiction' ? 'user-astronaut' :
                        genre === 'life & adventure' ? 'leaf' :
                        genre === 'fan fiction' ? 'quidditch' :
                        genre === 'after dark' ? 'moon' : 
                        'dumpster-fire'}
                    color='#ffffff'
                    size={30}
                />
            </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
          <ImageBackground
            source={{uri: imageUri}}
            style={[BackgroundColors, styles.image]}
            imageStyle={{ borderRadius: 15}}
          >
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={onPlay}>
                        <View style={{flexDirection: 'row', backgroundColor: '#00000099', alignItems: 'center', marginTop: 10, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15}}>
                            <FontAwesome5 
                                name='play'
                                color='#fff'
                                size={10}
                            />
                            <Text style={{ color: '#fff', fontSize: 13, paddingVertical: 0, marginLeft: 10}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#00000099', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>   
                    <Text style={{ color: '#fff', paddingVertical: 5, paddingHorizontal: 10, fontSize: 14,}}>
                        {title}
                    </Text> 
                </View>  
          </ImageBackground>
        </TouchableWithoutFeedback>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
                    <View>
                        <Text style={[Colors, { 
                            fontWeight: 'normal', fontSize: 12, textTransform: 'capitalize',
                            paddingHorizontal: 8, paddingVertical: 2, borderWidth: 0.5, 
                            borderRadius: 15, backgroundColor: '#0000004D'
                    }]}>
                            {genre}
                        </Text>
                    </View> 
                    <View style={{ flexDirection: 'row'}}>
                        {/* <FontAwesome
                            name={isLiked ? 'star' : 'star-o'}
                            size={18}
                            color={isLiked ? 'gold' : '#ffffffa5'}
                            onPress={onLikePress}
                            style={{ marginRight: 15 }}
                        /> */}
                        <AntDesign 
                                    name={isQ ? 'pushpin' : 'pushpino'}
                                    size={18}
                                    color={isQ ? 'cyan' : '#ffffffa5'}
                                    onPress={onQPress}
                                    style={{ marginRight: 10}}
                                />
                    </View>
                    
            </View>  
      </View>
    );
}

const TrendingList = ({genre}) => {

    //load the list of stories from AWS
    // const fetchStorys = async () => {
    //     try {
    //         const response = await API.graphql(
    //             graphqlOperation(
    //                 listStorys
    //             )
    //         )
    //         setStorys(response.data.listStorys.items);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const [isFetching, setIsFetching] = useState(false);

    const [Storys, setStorys] = useState([]);

    useEffect( () => {
        const fetchStorys = async () => {
            if (genre!=='all') {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStorys, {
                                filter: {
                                    genre: {
                                        eq: genre
                                    }
                                }
                            } 
                        )
                    )
                    setStorys(response.data.listStorys.items);
                } catch (e) {
                    console.log(e);}
            }
            else {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStorys
                        )
                    )
                    setStorys(response.data.listStorys.items);
                } catch (e) {
                    console.log(e);}
            }
        }
        fetchStorys();
    },[])

    const onRefresh = () => {
        setIsFetching(true);
        //fetchStorys();
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const renderItem = ({ item }) => (

        <Item 
          title={item.title}
          imageUri={item.imageUri}
          genre={item.genre}
          audioUri={item.audioUri}
          description={item.description}
          writer={item.writer}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          //liked={item.liked}
          //rating={item.rating}
        />
      );

    return (
        <View>
            <FlatList
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={true}
                refreshControl={
                    <RefreshControl
                    refreshing={isFetching}
                    onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    <View style={{ width: 100, height: 160, justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome5 
                            name='chevron-circle-right'
                            color='#ffffffa5'
                            size={25}
                        />
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    containernew: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20,
        marginVertical: 20,
        borderRadius: 20,
      },
    image: {
        resizeMode: 'cover',
        width: 180,
        height: 160,
        justifyContent: 'space-between',
        marginBottom: 6,
        //backgroundColor: '#363636',
        borderRadius: 15
      },
      title: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#000000a0',
      },
});

export default TrendingList;