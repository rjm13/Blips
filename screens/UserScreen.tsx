import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import AudioListByAuthor from '../components/AudioListByAuthor';

import {useRoute} from '@react-navigation/native'

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';
//import { createFollowingID, deleteFollowingID } from '../src/graphql/mutations';


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


    return (
        <View style={styles.container}>
        
            <AudioListByAuthor genre={'crime'}/>
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