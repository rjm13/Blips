import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import AudioStoryFlatList from '../components/AudioStoryFlatList';


import {useRoute} from '@react-navigation/native'

// import { API, graphqlOperation, Auth } from "aws-amplify";
// import { getUser } from '../src/graphql/queries';
// import { updateUser } from '../src/graphql/mutations';
// import { createFollowingID, deleteFollowingID } from '../src/graphql/mutations';


const UserScreen = ({navigation} : any) => {

    const [User, setUser] = useState(null);

    const route = useRoute();
    const {userID} = route.params

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await API.graphql(graphqlOperation(
                  getUser, {id: userID}))
                  if (userData) {
                    setUser(userData.data.getUser);
                  }
                  console.log(userData.data.getUser);
            } catch (e) {
                console.log(e);
              }  
        }
        fetchUser();   
      }, [])


    const [SelectedId, setSelectedId] = useState(1);

    const [Following, setFollowing] = useState(false);

    const FollowUser = async () => {

        const userInfo = await Auth.currentAuthenticatedUser();

        const followingId = await API.graphql(graphqlOperation(createFollowingID, { 
            input: {followingIDUserId: userInfo.attributes.sub, followingIDFollowerId: User?.id}}))

        console.log(followingId)
    }

    const UnfollowUser = async () => {

        const userInfo = await Auth.currentAuthenticatedUser();

        //get the post(id) to delete using the User state attributes (User?.id)

        const toDelete = userInfo.attributes.following.items.id

        const followingId = await API.graphql(graphqlOperation(deleteFollowingID, { 
            input: { id: toDelete}}))

        console.log(followingId)
    }

    function FollowButton () {
        if (Following === true) {
            setFollowing(false)
        }
        else {
            setFollowing(true)
            FollowUser();
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'center'}}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{
                            marginVertical: 20
                        }}
                        onPress={() => navigation.goBack() }
                    />
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

                <View style={{ alignItems: 'center'}}>
                    <Text style={styles.header}>
                        {User?.name}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 20, alignSelf: 'center'}}>
                                <FontAwesome5 
                                    name='book-open'
                                    size={12}
                                    color='#ffffffa5'
                                    style={{ marginRight: 5}}
                                />
                            <Text style={styles.userId}>
                                    0
                                </Text>  
                                <FontAwesome5 
                                    name='book-reader'
                                    size={12}
                                    color='#ffffffa5'
                                    style={{ marginRight: 5}}
                                />
                            <Text style={styles.userId}>
                                    0
                                </Text> 
                            </View> 

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
        
                    <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
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
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                        <Text style={{ 
                            color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                            marginHorizontal: 15, 
                            fontSize: SelectedId ===  2 ? 22 : 17,
                            fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                        }}>
                            Narrations
                        </Text>
                    </TouchableWithoutFeedback>
                </View>

                <AudioStoryFlatList genre={null} search ={null} all={'all'}/>
                    
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginTop: 20,
        marginBottom: 10,
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
});

export default UserScreen;