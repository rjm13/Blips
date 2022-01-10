import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableOpacity,  Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

import { useNavigation } from '@react-navigation/native';


const Terms = ({navigation} : any) => {

    

    return (
        <View>
            
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.header}>
                        Publishing Agreement
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}}>

                    
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

export default Terms;