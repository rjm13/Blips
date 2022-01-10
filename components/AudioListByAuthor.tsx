import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, Modal, StyleSheet, Text, FlatList, Dimensions, RefreshControl, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, PanResponder } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';


import {useRoute} from '@react-navigation/native'

import { AppContext } from '../AppContext';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
  } from 'react-native-popup-menu';

// import dummyaudio from '../data/dummyaudio';
//import { listStorys } from '../src/graphql/queries';
import { deleteStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import { getUser, getFollowingConn, listFollowingConns } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';
import { createFollowingConn, deleteFollowingConn } from '../src/graphql/mutations';

import { ItemParamList } from '../types';




const Item = ({title, genre, description, imageUri, audioUri, writer, narrator, time, id} : any) => {
    

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

const AudioListByAuthor = ({genre}) => {

    const navigation = useNavigation();

    const fetchStorys = async () => {
        
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

      //const animation = useRef(new Animated.ValueXY({ x: 0, y: 300-20 })).current;

    const [Color, setColor] = useState('#363636')

    useEffect(() => {
        if (genre === 'crime') setColor('#cac715')
        if (genre === 'fantasy') setColor('#15ca54')
        if (genre === 'suspense') setColor('#1579ca')
        if (genre === 'comedy') setColor('#ff9ce6')
        if (genre === 'science fiction') setColor('#c97f8b')
        if (genre === 'life & adventure') setColor('#15b8ca')
        if (genre === 'fan fiction') setColor('#a05ebf')
        if (genre === 'after dark') setColor('#5b6ade')
    })

      const animation = useRef(new Animated.Value(0)).current;

      const [isScrollEnabled, setIsScrollEnabled] = useState(true);

      const [scrollOffset, setScrollOffset] = useState(0);


    // const animatedHeight = {
    //     transform: animation.getTranslateTransform(),
    // };

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedOpacitySlow = animation.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 450],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 350],
        outputRange: [450, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [0, 800],
        outputRange: ['#000000', '#363636'],
        extrapolate: 'clamp',
        });

    // const BackgroundColors = {
    //     backgroundColor: 
    //         genre === 'crime' ? '#cac715' : 
    //         genre === 'fantasy' ? '#15ca54' :
    //         genre === 'suspense' ? '#1579ca' :
    //         genre === 'comedy' ? '#ff9ce6' :
    //         genre === 'science fiction' ? '#c97f8b' :
    //         genre === 'life & adventure' ? '#15b8ca' :
    //         genre === 'fan fiction' ? '#a05ebf' :
    //         genre === 'after dark' ? '#5b6ade' : 
    //         'cyan'
    // }

    const [User, setUser] = useState(null);

    const route = useRoute();
    const {userID} = route.params

    // useEffect(() => {
        
    //     const fetchUser = async () => {
    //         try {
    //             const userData = await API.graphql(graphqlOperation(
    //               getUser, {id: userID}))
    //               if (userData) {
    //                 setUser(userData.data.getUser);
    //               }
    //               console.log(userData.data.getUser);
    //         } catch (e) {
    //             console.log(e);
    //           }  
    //     }
    //     fetchUser();   
    //   }, [])

      

      const [currentUser, setCurrentUser] = useState(null)

      const [Following, setFollowing] = useState(false);

      

      useEffect(() => {

        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser(); 

            try {
                const authorData = await API.graphql(graphqlOperation(
                    getUser, {id: userID}))
                    if (authorData) {
                    setUser(authorData.data.getUser);
                    }
                    console.log(authorData.data.getUser);
            // } catch (e) {
            //     console.log(e);
            //     }  

            // try {                
                const userData = await API.graphql(graphqlOperation(
                  getUser, {id: userInfo.attributes.sub}))
                  if (userData) {
                    setCurrentUser(userData.data.getUser);
                  } 
            // } catch (e) {
            //     console.log(e);
            //   }  
            //   try {                
                const followData = await API.graphql(graphqlOperation(
                    listFollowingConns, {
                        filter: {
                            authorID: {
                                eq: authorData.data.getUser.id
                            },
                            followerID: {
                                eq: userData.data.getUser.id
                            }
                        }
                    }))
                  if (followData.data.listFollowingConns.items.length === 1) {
                    setFollowing(true);
                  } 
            } catch (e) {
                console.log(e);
              }  
        }
        fetchUser();   
        
      }, [])

    //   useEffect(() => {
    //     if (currentUser?.following) {
    //       if (currentUser?.following.includes(User.id)) {
    //             setFollowing(true);
    //           }
    //     } else {null}   
    //   }, [])


    const [SelectedId, setSelectedId] = useState(1);


    // useEffect(() => {
    //     if (currentUser?.following?.includes(User?.id)) {
    //         setFollowing(true);
    //         console.log('this user is being followed')
    //     }
    // }, [])

    const FollowUser = async () => {

        // console.log(currentUser)

        // const updatedUser = {
        //     id: currentUser.id,
        //     //following: currentUser?.following?.includes(User?.id) ? currentUser?.following?.filter(item => item !== User?.id) :
        //     following: currentUser?.following !== null || [] ? [...currentUser?.following, User?.id] : [User?.id]
        // }

        // let followingInfo = await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))
        // console.log(followingInfo)

        // console.log('this is the')
        // console.log(User)

        // const updatedUser = {
        //     id: currentUser.id,
        //     followers: [User]
        // }

        let createConnection = await API.graphql(graphqlOperation(
            createFollowingConn, {input: {followerID: currentUser.id, authorID: User.id}}
        ))
        //let followersInfo = await API.graphql(graphqlOperation(updateUser, {input: updatedUser}))
        //console.log(followersInfo)
        console.log(createConnection)
    }

    const unFollowUser = async () => {

        // console.log(currentUser)

        // const updatedUser = {
        //     id: currentUser.id,
        //     following:  currentUser?.following?.filter(item => item !== User?.id) 
        //     //currentUser?.following !== null || [] ? [...currentUser?.following, User?.id] : [User?.id]
        // }

        // if (currentUser?.following?.includes(User?.id)) {
        //     let followingInfo = await API.graphql(graphqlOperation(updateUser, { input: updatedUser }))
        //     console.log(followingInfo)
        // }

        
        
        let getConnection = await API.graphql(graphqlOperation(
            listFollowingConns, {
                filter: {
                    authorID: {
                        eq: User.id
                    },
                    followerID: {
                        eq: currentUser.id
                    }
                }
            }
        ))
        
        let connectionID = getConnection.data.listFollowingConns.items[0].id
        console.log(connectionID)


        let deleteConnection = await API.graphql(graphqlOperation(
            deleteFollowingConn, {input: {"id": connectionID}}
        ))
        console.log(deleteConnection)
        console.log(currentUser);
        

    }

    

    function FollowButton () {
        if (Following === true) {
            unFollowUser();
            setFollowing(false);
        }
        if (Following === false) {
            FollowUser();
            setFollowing(true)
            
        }
    }





    return (

        <View style={[styles.container]}>

            <Animated.FlatList 
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //extraData={Following}
                //stickyHeaderIndices={[0]}
                //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: animation } } }],
                    { useNativeDriver: false }
                  )}
                scrollEventThrottle={1}
                //style={{marginTop: 300}}
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
                            
                        </Text>
                    </View>
                    );}
                }
                ListHeaderComponent={ () => {

                    return (

                        <View style={{ height: 500}}>
                        </View>                
                        );
                    }}
            />

                        <Animated.View style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute', flex: 1}]}
                        >
                       
                                <View style={{ flexDirection: 'row', marginVertical: 40, justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center'}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <AntDesign 
                                            name='close'
                                            size={25}
                                            color='#fff'
                                            style={{
                                                marginVertical: 20,
                                                marginRight: 10,
                                            }}
                                            onPress={() => navigation.goBack() }
                                        />
                                        <Animated.Text style={[styles.name, { opacity: animatedAppearOpacity}]}>
                                            {User?.name}
                                        </Animated.Text>
                                    </View>
                                    <TouchableOpacity onPress={FollowButton}>
                                        <View>
                                            <Text style={{
                                                color: Following === true ? '#000' : 'cyan',
                                                backgroundColor: Following === true ? 'cyan' : 'transparent',
                                                borderRadius: 20,
                                                paddingHorizontal: 20,
                                                paddingVertical: 5,
                                                borderWidth: Following === true ? 0 : 0.5,
                                                borderColor: 'cyan',
                                            }}>
                                                {Following === true ? 'Following' : 'Follow'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Animated.View style={{opacity: animatedOpacitySlow}}>

                                    <View style={{ alignItems: 'center'}}>
                                        <Image 
                                            source={{ uri: User?.imageUri}}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                backgroundColor: '#363636',
                                                borderRadius: 60,
                                                marginTop: 20,
                                                
                                            }}
                                        />
                                    </View>

                                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                                            {User?.pseudonym}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                        <FontAwesome5 
                                            name='book-reader'
                                            size={12}
                                            color='#ffffffa5'
                                            style={{ marginRight: 5}}
                                        />
                                        <Text style={styles.userId}>
                                            {User?.authored.length ? User?.authored.length : 0}
                                        </Text> 
                                    </View> 
                                </Animated.View>

                                <Animated.View style={{opacity: animatedOpacity}}>
                                <View style={{ alignItems: 'center', marginHorizontal: 20, marginVertical: 10}}>
                                    <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                                        {User?.bio}
                                    </Text>
                                </View>

                                <View style={{ 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-evenly', 
                                    width: '100%', 
                                    alignItems: 'flex-end',
                                    //marginHorizontal: 20,
                                    height: 50,
                                    marginBottom: 20
                                }}>
                        
                                    {/* <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                                        <Text style={{ 
                                            color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                                            marginHorizontal: 15, 
                                            fontSize: SelectedId ===  1 ? 22 : 17,
                                            fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                                            borderBottomColor: '#fff',
                                            //borderBottomWidth: SelectedId ===  1 ? 1 : 0,
                                        }}>
                                            Authored
                                        </Text>
                                    </TouchableWithoutFeedback> */}

                                    {/* <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                                        <Text style={{ 
                                            color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                                            marginHorizontal: 15, 
                                            fontSize: SelectedId ===  2 ? 22 : 17,
                                            fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                                        }}>
                                            Narrations
                                        </Text>
                                    </TouchableWithoutFeedback> */}
                                </View> 
                                </Animated.View>
                                 
                           
                            
                        </Animated.View>

</View>
    );}

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

export default AudioListByAuthor;
