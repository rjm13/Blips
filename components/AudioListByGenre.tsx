import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, Modal, StyleSheet, Text, FlatList, Dimensions, RefreshControl, TouchableWithoutFeedback, TouchableOpacity, Image, Animated, PanResponder } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

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
// import { listStorys } from '../src/graphql/queries';
// import { deleteStory } from '../src/graphql/mutations';
// import {graphqlOperation, API, Auth} from 'aws-amplify';

import { ItemParamList } from '../types';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';




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

const AudioListByGenre = ({genre}) => {

    const [sortModalVisible, setSortModalVisible] = useState(false);

    const [checked, setChecked] = useState('first');

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
        if (genre === 'adventure') setColor('#27d995')
        if (genre === 'comedy') setColor('#ff9ce6')
        if (genre === 'crime') setColor('#cac715')
        if (genre === 'fan fiction') setColor('#a05ebf')
        if (genre === 'fantasy') setColor('#15ca54')
        if (genre === 'horror') setColor('#1579ca')
        if (genre === 'life') setColor('#15b8ca')
        if (genre === 'love') setColor('#f05161')
        if (genre === 'mystery') setColor('#ff6f00')
        if (genre === 'science fiction') setColor('#c97f8b')
        if (genre === 'after dark') setColor('#7081ff')
    })

      const animation = useRef(new Animated.Value(0)).current;

      const [isScrollEnabled, setIsScrollEnabled] = useState(true);

      const [scrollOffset, setScrollOffset] = useState(0);


    // const animatedHeight = {
    //     transform: animation.getTranslateTransform(),
    // };

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 300],
        outputRange: [300, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [0, 300],
        outputRange: ['#000000', Color],
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




    return (

        <View style={[styles.container]}>


            <Animated.FlatList 
                data={Storys}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={true}
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
                        <View style={{ height: 300}}>
                        </View>
                    )
                }}
            />

            <Animated.View 
                style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute'}]}
            >
                <Modal
                animationType="slide"
                transparent={true}
                //presentationStyle='overFullScreen'
                visible={sortModalVisible}
                onRequestClose={() => {
                setSortModalVisible(!sortModalVisible);
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
                                        backgroundColor: "#363636",
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
                                        elevation: 5,
                                        width: Dimensions.get('window').width/1.5
                                        }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', width: '100%'}}>Sort by</Text>
                        <View style={{ marginTop: 20}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="first"
                                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('first')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    A - Z
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="second"
                                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('second')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Z - A
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="third"
                                    status={ checked === 'third' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('third')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Newest
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="fourth"
                                    status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('fourth')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Oldest
                                </Text>
                            </View>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButton
                                    value="fifth"
                                    status={ checked === 'fifth' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('fifth')}
                                /> 
                                <Text style={{marginHorizontal: 20, color: '#fff'}}>
                                    Highest Rating
                                </Text>
                            </View>
                            
                        </View>

                        <View style={{marginTop: 50}}>
                            <TouchableOpacity onPress={() => {setSortModalVisible(!sortModalVisible);}}>
                                <Text style={{color: '#ffffffa5'}}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    
                    </View>
                </Modal>
                <LinearGradient
                    colors={[Color, Color, 'transparent']}
                    style={{height: '100%'}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={{ marginTop: 40, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#000'
                                size={22}
                                onPress={() => navigation.goBack()}
                            />
                            <Animated.Text style={{ marginLeft: 20, textAlign: 'center', opacity: animatedAppearOpacity, fontSize: 18, textTransform: 'capitalize', fontWeight: 'bold'}}>
                                {genre}
                            </Animated.Text>
                        </View>
                        <FontAwesome5 
                            name='sort-alpha-down'
                            color='#000'
                            size={22}
                            onPress={() => setSortModalVisible(!sortModalVisible)}
                        />
                    </View>
                    <View style={{ top: 40, alignItems: 'center'}}>
                        <Animated.Text style={{ fontSize: 32, color: '#000', textTransform: 'capitalize', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {genre}
                        </Animated.Text>
                    </View>
                    
                </LinearGradient>
            </Animated.View>

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

export default AudioListByGenre;
