import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,  
    Image 
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser, listFollowingConns } from '../src/graphql/queries';



const ProfileScreen = ({navigation} : any) => {

    //the number of followers an author has, set by listing the followingconns
    const [numFollowers, setNumFollowers] = useState();

    //the current authenticated user
    const [user, setUser] = useState();

    //on render, set the current user and get the list of followers an author has
    useEffect(() => {
      const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
          if (!userInfo) {
            return;
          }
        try {
            const userData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            if (userData) {setUser(userData.data.getUser);}

            const getFollowers = await API.graphql(graphqlOperation(
                listFollowingConns, {
                    filter: {
                        authorID: {
                            eq: userData.data.getUser.id
                        }
                    }
                }
            ))

            setNumFollowers(getFollowers.data.listFollowingConns.items.length)

        } catch (e) {
          console.log(e);
        }
      }
      fetchUser();
    }, [])

    return (
        <View>
            
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.header}>
                        Account
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={ user?.imageUri ? { uri: user.imageUri} : require('../assets/images/blankprofile.png')}
                            style={{
                                width: 120,
                                height: 120,
                                backgroundColor: '#363636',
                                borderRadius: 60,
                                marginTop: 20,
                            }}
                        />
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Following')}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ alignItems: 'center', margin: 20}}>
                                    <Text style={{ color: 'cyan', opacity: .5}}>
                                        {user?.followers.items.length}
                                    </Text>
                                    <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                        Following
                                    </Text>
                                </View>

                                {user?.isPublisher === true ? (
                                    <View style={{ alignItems: 'center', margin: 20}}>
                                        <Text style={{ color: 'cyan', opacity: .5}}>
                                            {numFollowers}
                                        </Text>
                                        <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                            Followers
                                        </Text>
                                    </View>
                                ) : null}
                                
                        </View>
                    </TouchableWithoutFeedback>

                    <View>
                        <Text style={styles.header}>
                        {user?.name}
                        </Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfileScreen', {user: user})}>
                        <View style={styles.tile}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Profile
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('History')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                History
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback 
                        onPress={ () => navigation.navigate( user?.isPublisher === true ? 'Publisher' : 'Publishing', {user: user})}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Publishing
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('PlanScreen')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                View Your Plan
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('NotificationSetting')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                App Settings
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('AboutScreen')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                About
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}> 
                        </View>
                    </TouchableWithoutFeedback>
                    
                </ScrollView>  
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
        marginVertical: 20,
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default ProfileScreen;