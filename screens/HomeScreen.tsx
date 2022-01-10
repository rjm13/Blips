import React, {useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';
import Trending from '../components/HorizList/Trending';
import ForYouCarousel from '../components/HorizList/ForYouCarousel';

const AudioStoryHome = ({navigation} : any) => {



    return (
        <ScrollView style={{backgroundColor: '#3b4b80a5' }}> 
        <LinearGradient
            colors={['#3b4b80', 'transparent', 'transparent', 'transparent', 'transparent']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
              
        
          
          <View style={{    flexDirection: 'row', justifyContent: 'space-between', 
                            marginTop: 60, marginBottom: 10, marginHorizontal: 20}}>
            <View style={{ flexDirection: 'row'}}>

                    <Text style={styles.pageheader}>
                        For you
                    </Text>
                
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                <View style={{ backgroundColor: 'transparent', padding: 30, margin: -30, justifyContent: 'center'}}>
                    <FontAwesome
                        name='user'
                        size={20}
                        color='#fff'
                        style={{ paddingLeft: 0, marginRight: 0, }}
                        
                    />
            </View>
            </TouchableWithoutFeedback>
            
          </View>

          <View>
            <ForYouCarousel />
          </View>
        
          <View>
              <Text style={styles.header}>
                  Trending
              </Text>
              <Trending genre='all'/>
          </View>

          <View>
              <Text style={styles.header}>
                  Under 10 Minutes
              </Text>
              <Trending genre='fantasy'/>
          </View>

          <View>
              <Text style={styles.header}>
                  Fan Fiction
              </Text>
              <Trending genre='fan fiction'/>
          </View>

          <View>
              <Text style={styles.header}>
                  Mystery
              </Text>
              <Trending genre='mystery'/>
          </View>   
        
        </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    pageheader: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginHorizontal: 0,
  },
});

export default AudioStoryHome;
