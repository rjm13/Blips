import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, Linking, TouchableOpacity,  Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

const ProfileScreen = ({navigation} : any) => {

    const pkg = require('../package.json');

    const appVersion = pkg.version;

    return (
        <View>
            
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{padding: 30, margin:-30}}>
                                <FontAwesome5 
                                    name='chevron-left'
                                    color='#fff'
                                    size={20}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    <Text style={styles.header}>
                        About
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                        <View style={styles.subblock}>
                            <Text style={styles.paragraph}>
                                Version
                            </Text>
                            <Text style={styles.subparagraph}>
                                {appVersion}
                            </Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('Terms')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Terms and Conditions
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
                                Privacy Policy
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
                                FAQ
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => Linking.openURL('mailto:martianspidermedia@gmail.com') }>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Contact Us
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    

                    {/* <TouchableOpacity onPress={() => navigation.navigate('NotificationSetting')}>
                        <View style={{ alignItems: 'center', marginHorizontal: 40, marginVertical: 10}}>
                            <Text style={{ color: '#fff', fontSize: 16, borderRadius: 20, borderColor: '#fff', paddingHorizontal: 20, paddingVertical: 5, borderWidth: .5}}>
                                Settings
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                    
                </ScrollView>  
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#ffffff'
    },
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
    subblock: {
        width: '75%',
    },
});

export default ProfileScreen;