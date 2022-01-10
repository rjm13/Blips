import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    TouchableWithoutFeedback
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import { useRoute } from '@react-navigation/native';

const PublishingMain = ({navigation} : any) => {

    const route = useRoute();
    const {User} = route.params


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                style={{height: Dimensions.get('window').height}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{marginHorizontal: 20, marginTop: 50}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                <View style={{padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'
                                        color="#fff"
                                        size={20}
                                        style={{alignSelf: 'center'}}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <Text style={styles.header}>
                                Publishing
                            </Text>
                        </View>
                    </View>  
                </View>

                <View style={styles.container}>

                    <FontAwesome5 
                        name='book-reader'
                        color='#fff'
                        size={30}
                        style={{alignSelf: 'center', marginTop: 40}}
                    />

                    <View style={{alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginHorizontal: 20, marginVertical: 40}}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                            Publish your audio shorts on Blip!
                        </Text>
                    </View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginHorizontal: 30, marginBottom: 40}}>
                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <FontAwesome5 
                                name='check-circle'
                                size={18}
                                color='#fff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            />
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Earn money for your stories
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <FontAwesome5 
                                name='check-circle'
                                size={18}
                                color='#fff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            />
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Hire a credited narrator and cover artist
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <FontAwesome5 
                                name='check-circle'
                                size={18}
                                color='#fff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            />
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Share your short stories around the world!
                            </Text>
                        </View>
                        
                    </View>

                    <TouchableOpacity 
                        style={{alignContent: 'center', justifyContent: 'center', marginTop: 60, marginHorizontal: 30, backgroundColor: 'cyan', height: 80, borderRadius: 10}}
                        onPress={() => {navigation.navigate('PublisherSetup', {user: User})}}
                    >
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                            Create a Publisher Profile
                        </Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
});

export default PublishingMain;