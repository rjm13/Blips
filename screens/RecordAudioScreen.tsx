
import React, {useState, useEffect, useRef} from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    TextInput
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Slider from '@react-native-community/slider';
import {LinearGradient} from 'expo-linear-gradient';

import { Audio } from 'expo-av';
import { Modal, Portal, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Auth } from "aws-amplify";

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import genres  from '../data/dummygenre';

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function RecordAudio({
  navigation,
}: StackScreenProps<RootStackParamList, 'RecordAudio'>) {   

    //get the current user in order to create a unique ID
    const [userID, setUserID] = useState()
  
    useEffect(() => {
        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            setUserID(userInfo.attributes.sub)
            
        }
        fetchUser();
    }, [])


      const Genre = genres.map((item, index) => item.genre)

      const [time, setTime] = useState(0);
  
      const [recTime, setRecTime] = useState(0)

      const [AudioData, setAudioData] = useState({
        id: 'recording' + userID + uuid.v4().toString(),
        title: uuid.v4().toString(),
        time: '',
        created: 0,
        audioUri: '',
        check_textInputChange: false,
      })

      const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setAudioData({
                ... AudioData,
                title: val,
                check_textInputChange: true
            });
        } else {
            setAudioData({
                ... AudioData,
                title: val,
                check_textInputChange: false
            });
        }
    }


      const SaveToStorage = async () => {

        let AudioToSave = {
            id: 'recording' + userID + uuid.v4().toString(),
            title: AudioData.title,
            time: AudioData.time,
            created: new Date(),
            audioUri: AudioData.audioUri,
        }

        try {
            const jsonAudio = JSON.stringify(AudioToSave)
            await AsyncStorage.setItem(AudioToSave.id, jsonAudio)
        } catch (e) {
            // saving error
        }

        console.log('Saved to Storage')
        console.log(AudioToSave)

        
    }

      //Toggle Switch
      const [isSwitchOn, setIsSwitchOn] = React.useState(false);
      const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
      //Modal
      const [visible, setVisible] = React.useState(false);
  
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {
          backgroundColor: 'transparent', 
          padding: 20,
      };

  
      const [recording, setRecording] = useState();

      const [isRecording, setIsRecording] = useState(false);
  
      useInterval(() => {
          if (isRecording) {
          setTime(time + 1000);
          }
        }, 1000);
  
        function millisToMinutesAndSeconds () {
          let minutes = Math.floor(time / 60000);
          let seconds = ((time % 60000) / 1000);
          return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        }  

//audio recording functions

  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  const [RecordedURI, SetRecordedURI] = useState<string>("");

  const [IsPLaying, SetIsPLaying] = useState<boolean>(false);

  const [stopped, setStopped] = useState(false)

  
      async function startRecording() {
          try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            setRecording(recording);
            setIsRecording(true);
            console.log('Recording started');
  
          let time = await recording.getStatusAsync();
          setRecTime(time.durationMillis);
  
  
          } catch (err) {
            console.error('Failed to start recording', err);
          }
        }
      
        async function stopRecording() {
          console.log('Stopping recording..');
          setRecording(undefined);
          setIsRecording(false);
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI(); 
          setAudioData({
            ...AudioData,
            audioUri: uri,
            time: millisToMinutesAndSeconds(),
          })
          setStopped(true);
          console.log('Recording stopped and stored at', uri);
        }

        async function pauseRecording() {
            console.log('Stopping recording..');
            showModal();
            await recording.pauseAsync();
            setIsRecording(false);
            console.log('Recording stopped and stored at');
          }
        
          async function unpauseRecording() {
            console.log('Stopping recording..');
            await recording.startAsync();
            setIsRecording(true);
            console.log('Recording stopped and stored at');
          }


  return (
    <Provider>
        <View style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center', padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                    
                        <View style={{alignItems: 'center', marginBottom: 40, justifyContent: 'space-between', width: '100%'}}>
                            <Text style={[styles.title, {textTransform: 'capitalize', marginBottom: 20}]}>
                            {AudioData.title}
                            </Text>   
                            <Text style={styles.timer}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                    
                        <View style={{ }}>
                            <TouchableOpacity
                                style={{ 
                                    marginBottom: 20,
                                }}
                                onPress={hideModal}>
                                <View
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        width: 200,
                                        borderWidth: 1,
                                        borderColor: 'cyan'
                                        }} >
                                    <Text style={{ color: 'cyan', fontSize: 16, textAlign: 'center'}}>
                                        Continue Recording
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{marginBottom: 20}}
                                onPress={() => { stopRecording(); }}
                                onLongPress={() => {SaveToStorage(); navigation.goBack();}}
                            >
                                <View
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        width: 200,
                                        backgroundColor: stopped === true ? 'gold' : 'cyan'
                                        }} >
                                    
                                    {stopped === true ? 
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
                                            Hold to Confirm
                                        </Text>
                                        :
                                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
                                            Save To Storage
                                        </Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>

            <View style={{ marginTop: 50, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <AntDesign 
                    name='close'
                    size={25}
                    color='#fff'
                    onPress={ () => navigation.goBack()}
                /> 
            </View>

            <View style={{ alignItems: 'center'}}>
                <Text style={[styles.title, {marginBottom: 30}]}>
                    Record a Short Story
                </Text>
                <Text style={{marginHorizontal: 40, color: '#fff', fontSize: 12}}>
                    In order to be eligible for submission, your story must be no longer than 2 hours 
                </Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', height: 500}}> 

                <Text style={[styles.title, {alignSelf: 'flex-start', marginLeft: 20, marginBottom: 10}]}>
                    Track Title
                </Text>
                                    
                <View style={[styles.inputfield, {height: 60}]}>
                    <TextInput
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={50}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={(val) => textInputChange(val)}
                    />
                </View>
                
                <TouchableOpacity onPress={
                    isRecording === true && recording ? pauseRecording : 
                    isRecording === false && !recording ? startRecording :
                    unpauseRecording
                    }>
                        <View style={[styles.recordbutton, {
                            backgroundColor: !isRecording ? 'transparent' : '#00ffff',
                            borderColor: !isRecording ? '#00ffff' : 'transparent',
                            borderWidth: 1
                            }]}>
                            <FontAwesome5 
                                name='microphone-alt'
                                color={ !isRecording ? '#00ffff' : '#000'}
                                size={30}
                            />
                        </View>
                </TouchableOpacity>

                <View style={{ marginVertical: 10,}}>
                    <Text style={styles.timer}>
                        {millisToMinutesAndSeconds()}
                    </Text>
                </View>
                <View style={{marginTop: 20}}>
                    {recording ? (
                    <Text style={{color: 'red', fontSize: 16}}>
                        Recording in Progress
                    </Text>
                    ) : null}
                </View>
            </View>
        </View>
    </Provider>
);
}

const styles = StyleSheet.create({
container: {
    //alignItems: 'center',
},
title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
},
textInput: {
    color: '#fff',
},
recordbutton: {
    backgroundColor: '#363636a5', 
    marginTop: 60,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
},
timer: {
    color: '#ffffff',
    fontSize: 18,
},
});

