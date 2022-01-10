import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    ScrollView
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

const PublishingSetup = ({navigation} : any) => {

    //const [user, setUser] = useState({})

    const route = useRoute();
    const {User} = route.params

    const [agree, setAgree] = useState(false);

    const [publishing, setPublishing] = useState(false);

    const [data, setData] = useState({
        pseudonym: '',
        publisher: false, 
    });

    //const [update, didUpdate] = useState(false);

    // useEffect(() => {
    //     setUser(User);
    // }, [])

    // useEffect(() => {
    //     const fetchUser = async () => {
    //       const userInfo = await Auth.currentAuthenticatedUser();
    //         if (!userInfo) {
    //           return;
    //         }
    //       try {
    //         const userData = await API.graphql(graphqlOperation(
    //           getUser, {id: userInfo.attributes.sub}))
    //           if (userData) {
    //             setUser(userData.data.getUser);
    //           }
    //           console.log(userData.data.getUser);
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //     fetchUser();
    //   }, [update])

    //const delay = ms => new Promise(res => setTimeout(res, ms));

//function for the text input
    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                pseudonym: val,
            });
        } else {
            setData({
                ... data,
                pseudonym: val,
            });
        }
    }

    const handleUpdateAttributes = async () => {

        if ( data.pseudonym.length !== 0 ) {
          //const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { id: User.id, pseudonym: data.pseudonym, isPublisher: true }
  
          //if (userInfo) {
            let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }
            ))
            
            console.log(result);

          if (result) {navigation.navigate('Publisher')}
          setPublishing(false);
          //}
      }
  }

  const updateAsPublisher = async () => {
    if (agree === true) {
        setPublishing(true);
        handleUpdateAttributes();
    }
    else {
        alert('You must agree to the Publishing Terms and Conditions to continue.')
    }
    
}

    return(
        <View>
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
                            Publisher Setup
                        </Text>
                    </View>
                </View>  
            </View>

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Pseudonym
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={30}
                            onChangeText={(val) => textInputChange(val)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Publishing Terms and Conditions
                    </Text>
                    <ScrollView style={{width: '90%', height: 260, borderRadius: 10, alignSelf: 'center', marginTop: 10, backgroundColor: '#363636a5'}}>
                        <Text style={{color: '#ffffffa5', margin: 20}}>
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                            i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name.                        
                        </Text>
                    </ScrollView>
                    <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
                        <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
                            <FontAwesome 
                                name={ agree ? 'check-circle' : 'check-circle-o'}
                                size={20} 
                                color={ agree ? 'cyan' : '#ffffffa5'} 
                            />
                            <Text style={{color: '#fff', marginLeft: 10, fontSize: 12}}>
                                I agree to the Publishing Terms and Conditions
                            </Text>
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity onPress={updateAsPublisher}>
                        <View style={styles.button}>
                            {publishing === true ? (
                                <ActivityIndicator size="small" color="cyan"/>
                            ) : (
                                <Text style={styles.buttontext}>
                                    Create Author Profile
                                </Text>
                            )}
                        </View>
                </TouchableOpacity>
                    
                </View>

        </View>
    
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40
    },
    inputheader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        alignItems: 'center',
        margin: 40,
     },
     buttontext: {
         backgroundColor: 'cyan',
         borderRadius: 20,
         paddingVertical: 10,
         paddingHorizontal: 20,
 
     },
});

export default PublishingSetup;