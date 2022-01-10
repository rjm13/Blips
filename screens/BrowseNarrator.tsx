import React, {useState} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

import FollowingList from '../components/FollowingList';

const BrowseNarrator = ({navigation} : any) => {

    function SearchBar () {

        const [searchQuery, setSearchQuery] = useState('');
      
        const onChangeSearch = query => setSearchQuery(query);
      
        return (
          <View>
            <Searchbar
              placeholder="Search"
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              value={searchQuery}
              iconColor='#000000a5'
              style={{
                height: 35,
                marginHorizontal: 20,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };


    return (
        <View >
        <LinearGradient
        colors={['#ffc0cba5', '#000', 'black']}
        //style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          
          <View style={{  alignItems: 'center', flexDirection: 'row', marginTop: 60, marginBottom: 20, marginHorizontal: 20}}>
                <FontAwesome5
                    name='chevron-left'
                    size={22}
                    color='#fff'
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ color: 'white', marginHorizontal: 0, fontSize: 22, fontWeight: 'bold'}}>
                    Narrators
                </Text>
          </View>
        
            <View style={{ marginBottom: 20}}>
                <SearchBar />
            </View>

            

            <View style={{ height: '80%'}}>
                <FollowingList />
            </View>

        </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
  header: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  box: {
    height: 100,
    width: 140,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  genrebox: {
    height: 80,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default BrowseNarrator;
