import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useRoute } from '@react-navigation/native';

import AudioStoryFlatList from '../components/AudioStoryFlatList';
import AudioListByGenre from '../components/AudioListByGenre';

const GenreHome = ({navigation} : any) => {

    const route = useRoute();

    const {genre} = route.params

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 0}}>
                <AudioListByGenre genre={genre}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    gradient: {
        height: 300
    },
});

export default GenreHome;