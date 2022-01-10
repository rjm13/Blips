import React, {useState} from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import AudioStoryFlatList from '../components/AudioStoryFlatList';

const AudioStoryHome = ({navigation} : any) => {

    const [SelectedId, setSelectedId] = useState(1);

    function renderElement () {

        if(SelectedId === undefined){
          return (<View>
            <Text style={{ color: 'white'}}>
              Test 1
            </Text>
          </View>);
        }
          if(SelectedId === 1){
              return (<View>
                <Text style={{ color: 'white'}}>
                  Test 1
                </Text>
              </View>);
        }
        else if(SelectedId === 2 ){
            return (<View>
            <Text style={{ color: 'white'}}>
                Test
            </Text>
            </View>);
        }
        else if(SelectedId === 3 ){
            return ;
        }
        else if(SelectedId === 4 ){
            return (<View>
            <Text style={{ color: 'white'}}>
                Test 4
            </Text>
            </View>);
        } 
      }

    return (
        <View >
        <LinearGradient
        colors={['#3b4b80a5','#3b4b80a5', '#000']}
        //style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      >
          
          <View>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                width: '100%', 
                alignItems: 'flex-end',
                marginHorizontal: 10,
                height: 80,
                marginTop: 10,
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
                        Queued
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                    <Text style={{ 
                        color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  2 ? 22 : 17,
                        fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                    }}>
                        Liked
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(3)}>
                    <Text style={{ 
                        color: SelectedId ===  3 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  3 ? 22 : 17,
                        fontWeight: SelectedId === 3 ? 'bold' : 'normal'
                    }}>
                        
                    </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => setSelectedId(4)}>
                    <Text style={{ 
                        color: SelectedId ===  4 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  4 ? 22 : 17,
                        fontWeight: SelectedId === 4 ? 'bold' : 'normal'
                    }}>                        
                        
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            
          </View>
        
            {/* <View>
                {renderElement()}
            </View> */}

            <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                <AudioStoryFlatList genre={null} search={null} all={'all'}/>
            </View>
           
            
        
        </LinearGradient>
        </View>
    );
}

export default AudioStoryHome;
