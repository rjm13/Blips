import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableWithoutFeedback, 
    FlatList, 
    RefreshControl, 
    TouchableOpacity 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Searchbar } from 'react-native-paper';

import {LinearGradient} from 'expo-linear-gradient';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { listFollowingConns, listUsers } from '../src/graphql/queries';
import { createFollowingConn, deleteFollowingConn } from '../src/graphql/mutations';


const FollowingScreen = ({navigation} : any) => {

    const [ users, setUsers ] = useState([]);

    const [user, setUser] = useState({})

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [searchQ, setSearchQ] = useState('');

    //function is not called
    // const fetchUsers = async () => {
    //     let Following = []
    //     const followData = await API.graphql(graphqlOperation(
    //         listFollowingConns, {
    //             filter: {followerID: {eq: user.id}}}))
    //         for (let i = 0; i < followData.data.listFollowingConns.items.length; i++) {
    //             Following.push(followData.data.listFollowingConns.items[i].author) 
    //         setUsers(Following);}}

    //refresh function, does not work yet
    const onRefresh = () => {
        setIsFetching(true);
        //fetchUsers();
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

//on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchUser = async () => {

            let Following = []

            const userInfo = await Auth.currentAuthenticatedUser();

                if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {setUser(userData.data.getUser);}

                const followData = await API.graphql(graphqlOperation(
                    listUsers, {
                        filter: {
                            isPublisher: {
                                eq: true
                            },
                            pseudonym: {
                                contains: searchQ
                            }
                        }
                }))

                // for (let i = 0; i < followData.data.listFollowingConns.items.length; i++) {
                //     Following.push(followData.data.listFollowingConns.items[i].author) 

                setUsers(followData.data.listUsers.items);
            } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate])

      //search bar

      
      function SearchBar () {

        const [searchQuery, setSearchQuery] = useState(searchQ);
      
        const onChangeSearch = query  => setSearchQuery(query);
      
        return (
          <View>
            <Searchbar
              placeholder={'Search Authors'}
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              value={searchQuery}
              iconColor='#000000a5'
              onIconPress={() => {setSearchQ(searchQuery); setDidUpdate(!didUpdate);}}
              onSubmitEditing={() => {setSearchQ(searchQuery); setDidUpdate(!didUpdate);}}
              //onClear={() => {setSearchQ(searchQuery); setDidUpdate(!didUpdate);}}
              style={{
                height: 35,
                marginLeft: 40,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 100
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };

    //legacy function for selected the state toggle between followers and following
    const [SelectedId, setSelectedId] = useState(1);

    //title item for the flatlist that displays the authors the user following
    const Item = ({ numAuthored, pseudonym, imageUri, id, bio } : any) => {

        //on item render, determine if the user is following them or not
        const [isFollowing, setIsFollowing] = useState(true)

        //show the options menu modal on the author tile
        const [ShowModalThing, setShowModalThing] = useState(false);
        
        //list the following connections that contain the current user and the selected author to determine if there is a following connection
        const fetchInfo = async () => {
            const getConnection = await API.graphql(graphqlOperation(
                listFollowingConns, {
                    filter: {
                        authorID: {
                            eq: id
                        },
                        followerID: {
                            eq: user.id
                        }
                    }
                }
            ))
           
            if (getConnection.data.listFollowingConns.items.length !== 1) {setIsFollowing(false)};

            setShowModalThing(!ShowModalThing)
        }
        
        
//follow a user function
        const FollowUser = async () => {
    
            let createConnection = await API.graphql(graphqlOperation(
                createFollowingConn, {input: {followerID: user.id, authorID: id}}
            ))
            console.log(createConnection)
        }
    
//unfollow a user
        const unFollowUser = async () => {
    
            let getConnection = await API.graphql(graphqlOperation(
                listFollowingConns, {
                    filter: {
                        authorID: {
                            eq: id
                        },
                        followerID: {
                            eq: user.id
                        }
                    }
                }
            ))
            console.log(getConnection)
            
            let connectionID = getConnection.data.listFollowingConns.items[0].id
            console.log(connectionID)
    
            let deleteConnection = await API.graphql(graphqlOperation(
                deleteFollowingConn, {input: {"id": connectionID}}
            ))
            console.log(deleteConnection)

            setDidUpdate(!didUpdate)
        }

        
    
        return (
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: id})}>
                        <View style={{ flexDirection: 'row'}}>
                            <Image 
                                source={ imageUri ? { uri: imageUri} : require('../assets/images/blankprofile.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'cyan'
                                }}
                            />
                        
                            <View style={{ marginHorizontal: 10}}>
                                <Text style={styles.name}>
                                    {pseudonym}
                                </Text> 
                                
                                
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    {/* <FontAwesome5 
                                        name='book-open'
                                        size={12}
                                        color='#ffffffa5'
                                        style={{ marginRight: 5}}
                                    />
                                    <Text style={styles.userId}>
                                        0
                                    </Text>   */}
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                        style={{ marginRight: 5}}
                                    />
                                    <Text style={styles.userId}>
                                        {numAuthored === null ? 0 : numAuthored}
                                    </Text> 
                                </View> 
                            </View>
                        </View>
                    </TouchableWithoutFeedback>    
    
                    <TouchableWithoutFeedback onPress={fetchInfo}>
                        <View style={{ backgroundColor: 'transparent', padding: 30, margin: -30, alignItems: 'flex-end' }}>
                            <AntDesign
                                name={'ellipsis1'}
                                size={20}
                                color='white'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>    
    
                <View style={{marginTop: 10, marginHorizontal: 5}}>
                    <Text style={{color: "#fff", fontSize: 12, }}>
                        {bio}
                    </Text>
                </View>
    
                {ShowModalThing === true ? (
                        
                        <View style={{ backgroundColor: '#484848', borderColor: 'black', borderRadius: 5, borderWidth: 0, position: 'absolute', right: 40, top: 30, alignSelf: 'flex-end'}}>
                            <TouchableOpacity onPress={isFollowing === true ? unFollowUser : FollowUser} >
                                <Text style={{color: '#fff', padding: 10}}>
                                    {isFollowing === true ? 'Unfollow' : 'Follow'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {navigation.navigate('UserScreen', {userID: id})}} >
                                <Text style={{color: '#fff', padding: 10}}>
                                    View Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    
                ) : null}
               
            </View>
        );
    }
    
    const renderItem = ({ item } : any) => (
    
        <Item 
            author={item}
            name={item.name}
            id={item.id}
            pseudonym={item.pseudonym}
            imageUri={item.imageUri}
            authored={item.authored}
            bio={item.bio}
            following={item.following}
            isPublisher={item.isPublisher}
            numAuthored={item.numAuthored}
        />
      );

    return (
    <View >
        <LinearGradient
        colors={['#363636', 'black', 'black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <View>
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', marginTop: 60, marginHorizontal: 20}}>
                    <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                  
                    <SearchBar />

                </View>
            
          </View>
                <View style={{ alignItems: 'center', marginTop: 20, height: '84%'}}>
                    <FlatList
                        style={{ width: '100%' }}
                        data={users}
                        extraData={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff'}}>
                                        There is nothing here. Check your connection.
                                    </Text>
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    
                                </View>
                            )
                        }}
                    />
                </View>
            {/* ) : SelectedId === 2 && user?.isPublisher === true ? (
                <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                    <FollowersList />
                </View>
            ) : null} */}

        </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
     },
     tile: {
         backgroundColor: '#383838a5',
         marginHorizontal: 20,
         marginVertical: 10,
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
     popupblock: {
         marginTop: 10,
     },
     paragraph: {
         color: '#ffffffa5'
     },
     playbutton: {
         borderWidth: 0.3,
         paddingHorizontal: 15,
         paddingVertical: 3,
         borderRadius: 15,
         borderColor: '#fff',
         color: '#fff',
     },
     time: {
         fontSize: 16,
         fontWeight: 'normal',
         color: '#ffffffa5',
     },
     category: {
         fontSize: 12,
         color: 'cyan',
         fontStyle: 'italic',
         marginVertical: 3,
 
     },
});

export default FollowingScreen;
