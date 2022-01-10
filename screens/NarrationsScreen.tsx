import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';

const Narrations = ({navigation} : any) => {


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                //style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <View style={{marginHorizontal: 20, marginTop: 50}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color="#fff"
                        size={20}
                        onPress={() => navigation.goBack()}
                    />
                    <FontAwesome5 
                        name='microphone-alt'
                        color="#fff"
                        size={20}
                    />

                </View>
                
                <Text style={styles.header}>
                    Narrations
                </Text>
            </View>
            <View style={{ height: '82%'}}>
                <AudioStoryFlatList />
            </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
   
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default Narrations;