import React, {useState, useEffect, useContext} from 'react';
import { View, Modal, StyleSheet, Text, FlatList, Dimensions, RefreshControl, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../AppContext';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
  } from 'react-native-popup-menu';

import dummyaudio from '../data/dummyaudio';
import { listStories } from '../src/graphql/queries';
import { deleteStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import { ItemParamList } from '../types';




const Item = ({title, genre, description, imageUri, audioUri, writer, narrator, time, id}) => {
    

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
    const navigation = useNavigation();

    const DeleteStory = async () => {
        let result = await API.graphql(
            graphqlOperation(deleteStory, { input: {id: id }}))
        console.log(result);
        setModalVisible(false);
    }

//expanding list component
    const [isVisible, setIsVisible] = useState(false);
//liking the item
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//queueing the item
    const [isQ, setQd] = useState(false);
    
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
        }
        if ( isQ === true ) {
            setQd(false);
        }  
    };
//confirm delete modal
    const [modalVisible, setModalVisible] = useState(false);


//play the audio story
const { setStoryID } = useContext(AppContext);

const onPlay = () => {
    setStoryID(id);
}

    return (
        <MenuProvider>
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                    <View 
                        style={{    
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20}}>
                                <View 
                                    style={{
                                        margin: 40,
                                        backgroundColor: "#1c1c1c",
                                        borderRadius: 20,
                                        padding: 35,
                                        alignItems: "center",
                                        shadowColor: "#fff",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2
                                            },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 4,
                                        elevation: 5}}>
                        <Text style={{ color: '#fff', fontSize: 16, width: '100%'}}>Are you sure you want to delete this story?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '120%'}}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    elevation: 2,
                                    backgroundColor: 'transparent',
                                    borderColor: 'cyan',
                                    borderWidth: 0.5,
                                    }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={{color: 'cyan'}}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    elevation: 2,
                                    backgroundColor: "cyan",}}
                                onPress={() => DeleteStory()}
                            >
                                <Text style={{}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    </View>
                </Modal>
        
        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
          
        <View style={styles.tile}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            
                <View style={{ width: '78%'}}>
                    
                    <Text style={styles.name}>
                        {title}
                    </Text> 
                    
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.category, Colors]}>
                            {genre}
                        </Text>
                           
                    </View>
                    
                    
                    
                    <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                        <FontAwesome5 
                            name='book-open'
                            size={12}
                            color='#ffffffa5'
                        />
                       <Text style={styles.userId}>
                            {writer}
                        </Text>  
                        <FontAwesome5 
                            name='book-reader'
                            size={12}
                            color='#ffffffa5'
                        />
                        <Text style={styles.userId}>
                            {narrator}
                        </Text> 
                    </View>
                    
                </View>
                <TouchableOpacity onPress={onPlay}>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        borderRadius: 30,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        backgroundColor: '#ffffff33',
                        borderColor: '#ffffffCC',
                        }}>
                            <FontAwesome5 
                                name='play'
                                color='#ffffff'
                                size={10}
                            />
                            <Text style={styles.time}>
                                12:53
                            </Text> 
                    </View>
                </TouchableOpacity>
                
                
                </View> 
                

                { isVisible ? (
                    <View style={styles.popupblock}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            
                        <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>
                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <FontAwesome
                                        name={isLiked ? 'star' : 'star-o'}
                                        size={22}
                                        color={isLiked ? 'gold' : 'white'}
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>1842</Text> */}
                                </View>
                                
                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <AntDesign
                                        name={isQ ? 'pushpin' : 'pushpino'}
                                        size={22}
                                        color={isQ ? 'cyan' : 'white'}
                                        onPress={onQPress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>

                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <FontAwesome
                                        name='commenting-o'
                                        size={22}
                                        color='white'
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>

                                <View style={{alignItems: 'center'}}>
                                    <FontAwesome
                                        name='share'
                                        size={22}
                                        color='white'
                                        onPress={onLikePress}
                                    />
                                    {/* <Text style={styles.icontext}>Share</Text> */}
                                </View>
                            </View>

                            <View>
                            
                            <View>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', }}>
                    <Menu>
                        <MenuTrigger children={<AntDesign name='ellipsis1' color='#fff' size={20}/>} />
                        <MenuOptions customStyles={{
                            optionsContainer: {
                                backgroundColor: '#1c1c1c',
                                paddingHorizontal: 10,
                                width: '40%',
                                
                                marginTop: 20,
                                borderRadius: 5,
                            }
                        }}>
                            <MenuOption onSelect={() => setModalVisible(true)} >
                                <Text style={{color: '#fff', fontSize: 16, paddingVertical: 15, }}>Delete</Text>
                                <Text style={{color: '#fff', fontSize: 16, paddingVertical: 15,}}>Edit</Text>
                                <Text style={{color: '#fff', fontSize: 16, paddingVertical: 15,}}>Flag</Text>
                            </MenuOption>
                        </MenuOptions>
                        </Menu>
                    </View>
                </View>
                            
                            </View>

                        </View>
                            
                        </View>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('AudioPlayer', {storyID: id})}>
                                <Image 
                                    source={{uri: imageUri}}
                                    style={{
                                        height: 200,
                                        borderRadius: 15,
                                        marginVertical: 15,
                                        marginHorizontal: -10
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        <Text style={styles.paragraph}>
                            {description}
                        </Text>
                        
                    </View>
                ) : false }  
        </View>
       
        </TouchableWithoutFeedback>
        </View>
         </MenuProvider>
    );
  }

const AudioStoryList = ({genre, search, all}) => {

    const fetchStorys = async () => {
        if (all === 'all') {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStorys, {
                            
                        } 
                    )
                )
                setStorys(response.data.listStorys.items);
            } catch (e) {
                console.log(e);}
        }
        if (search) {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        listStorys, {
                            filter: {
                                title: {
                                    contains: search
                                }
                            }
                        } 
                    )
                )
                setStorys(response.data.listStorys.items);
            } catch (e) {
                console.log(e);}
        }
        if (genre) {
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
        // else {
        //     try {
        //         const response = await API.graphql(
        //             graphqlOperation(
        //                 listStorys
        //             )
        //         )
        //         setStorys(response.data.listStorys.items);
        //     } catch (e) {
        //         console.log(e);}
        // }
    }

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        fetchStorys();
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const [Storys, setStorys] = useState([]);

    useEffect( () => {
        const fetchStorys = async () => {
            if (all === 'all') {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStorys, {
                                
                            } 
                        )
                    )
                    setStorys(response.data.listStorys.items);
                } catch (e) {
                    console.log(e);}
            }
            if (search) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStorys, {
                                filter: {
                                    title: {
                                        contains: search
                                    }
                                }
                            } 
                        )
                    )
                    setStorys(response.data.listStorys.items);
                } catch (e) {
                    console.log(e);}
            }
            if (genre) {
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
            // else {
            //     try {
            //         const response = await API.graphql(
            //             graphqlOperation(
            //                 listStorys
            //             )
            //         )
            //         setStorys(response.data.listStorys.items);
            //     } catch (e) {
            //         console.log(e);}
            // }
        }
        fetchStorys();
    },[])

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

        <View style={styles.container}>

            <FlatList 
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={true}
                refreshControl={
                    <RefreshControl
                     refreshing={isFetching}
                     onRefresh={onRefresh}
                    />
                  }
                showsVerticalScrollIndicator={false}    
                ListFooterComponent={ () => {
                    return (
                    <View style={{ height:  70, alignItems: 'center'}}>
                        <Text style={{ color: 'white', margin: 20,}}>
                            Load more
                        </Text>
                    </View>
                );

                }

                }
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
    },
    tile: {
        backgroundColor: '#363636a5',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
    icontext: {
        fontSize: 10,
        color: '#ffffffa5',
        marginTop: 5,
    },
    popupblock: {
        marginTop: 10,
    },
    paragraph: {
        color: '#ffffffB3'
    },
    playbutton: {
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        borderColor: '#ffffffa5',
        color: '#ffffffa5',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
    category: {
        fontSize: 14,
        color: 'cyan',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default AudioStoryList;
