import React, { useEffect, useState } from 'react';
import { 
    View, 
    ScrollView,
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TextInput, 
    Platform, 
    ActivityIndicator 
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Modal, Portal, Provider } from 'react-native-paper';
import uuid from 'react-native-uuid';

import uploadImageOnS3 from '../components/functions/imagepicker';


const EditProfile = ({navigation} : any) => {


//on render, request permission for camera roll
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

//pick the image from the camera roll
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    //set the current user's id via route params
    const route = useRoute();
    const {User} = route.params

    //the current authenticated user object
    const [user, setUser] = useState(User)

    //determines if the user object updated. If it did, pull the info
    const [update, didUpdate] = useState(false);

//when didUpdate is called, pull the user attributes from AWS
    useEffect(() => {
        const fetchUser = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {setUser(userData.data.getUser);}

                console.log(userData.data.getUser);

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
      }, [update])

//sign out function
    async function signOut() {
        try {
            await Auth.signOut()
            .then(() => navigation.navigate('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
            alert("error signing out")
        }
    }

//PhotoModal
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

//SignOutModal
    const [visible2, setVisible2] = React.useState(false);
    const showSignOutModal = () => setVisible2(true);
    const hideSignOutModal = () => setVisible2(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//NameModal
const [visible3, setVisible3] = useState(false);
const showNameModal = () => setVisible3(true);
const hideNameModal = () => setVisible3(false);

//EmailModal
const [visible4, setVisible4] = useState(false);
const showEmailModal = () => setVisible4(true);
const hideEmailModal = () => setVisible4(false);

//BioModal
const [visible5, setVisible5] = useState(false);
const showBioModal = () => setVisible5(true);
const hideBioModal = () => setVisible5(false);

//PassModal
const [visible6, setVisible6] = useState(false);
const showPassModal = () => setVisible6(true);
const hidePassModal = () => setVisible6(false);

//pseudonym Modal
const [visible7, setVisible7] = useState(false);
const showPseudModal = () => setVisible7(true);
const hidePseudModal = () => setVisible7(false);

//Attribute states
const [ Name, setName ] = useState('');
const [ Email, setEmail ] = useState('');
const [ Bio, setBio ] = useState('');
const [ confirmCode, setConfirmCode] = useState('');
const [ Password, setPassword] = useState('');
const [ oldPassword, setOldPassword] = useState('');
const [image, setImage] = useState('');
const [Pseudonym, setPseudonym] = useState('');

const [avatarKey, setAvatarKey] = useState('');

//if true, s3 is performing an action. also used to determine if anything is updating
const [isUploading, setIsUploading ] = useState(false);


//to send the profile image to the s3 bucket, this sets file and retrieves the avatar key
const handleUpdateImage = async ()=> {

    try {
        const response = await fetch(image);

        const blob = await response.blob();

        const filename =  uuid.v4().toString();

        const s3Response = await Storage.put(filename, blob);

        setAvatarKey(s3Response.key);

    } catch (e) {
        console.error(e);
    }
}

//using the avatar key, get and update the imageuri for the user
const PublishAvatar = async () => {

    setIsUploading(true);

    await handleUpdateImage();

    if ( avatarKey !== '' ) {

        const response = await Storage.get(avatarKey);
  
        const updatedUser = { id: user.id, imageUri: response }
  
        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
            ))
        console.log(result);
        
        }
    setIsUploading(false);
    hideModal();
};

//update the users name
const handleUpdateName = async () => {

    setIsUploading(true);

    if ( Name.length !== 0 ) {

        const updatedUser = { id: user.id, name: Name }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hideNameModal();
    }
}

//update the author's pseudonym
const handleUpdatePseudonym = async () => {

    setIsUploading(true);

    if ( Pseudonym.length !== 0 ) {

        const updatedUser = { id: user.id, name: Pseudonym }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hidePseudModal();
    }
}

//update the users bio text
const handleUpdateBio = async () => {

    setIsUploading(true);

    if ( Bio.length !== 0 ) {

        const updatedUser = { id: user.id, bio: Bio }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
        ))

      console.log(result);
      
      setIsUploading(false);
      hideBioModal();
      didUpdate(!update);
  }
}

//update the users email address as a user attribute in cognito
const handleUpdateEmail = async () => {

    setIsUploading(true);

  if ( Email.length !== 0 ) {
      
      const userInfo = await Auth.currentAuthenticatedUser();

      if (userInfo) {
        let result = await Auth.updateUserAttributes(userInfo, {'email': Email})
        console.log(result);
      } else {
          alert('Error: Please enter a different email or try again later.')
      }
  }

  setIsUploading(false);
}

//verify with a confirmation code
const handleConfirmCode = async () => {

    setIsUploading(true);

    let result = await Auth.verifyCurrentUserAttributeSubmit(
        'email',
        confirmCode,
        );
    console.log(result); // SUCCESS  

    setIsUploading(false);
    hideEmailModal();
}

//update the users password
const handleUpdatePassword = async () => {

    setIsUploading(true);
    const userInfo = await Auth.currentAuthenticatedUser();

    let result = await Auth.changePassword(userInfo, oldPassword, Password);
    console.log(result); // SUCCESS  
    setIsUploading(false); 
    hidePassModal();
}

//render the page
    return (

    <Provider>   
    <View style={styles.container } >
        <Portal>
{/* //Update name  */}
            <Modal visible={visible3} onDismiss={hideNameModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new name
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.name}
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setName(val)}
                            //defaultValue={user?.name}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdateName}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text> 
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

{/* //Update pseudonym  */}
            <Modal visible={visible7} onDismiss={hidePseudModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new pseudonym
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.pseudonym}
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setPseudonym(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdatePseudonym}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                     <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>   
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

{/* //Update Email Address */}
            <Modal visible={visible4} onDismiss={hideEmailModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                            Enter a new email
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.email}
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={40}
                            multiline={false}
                            onChangeText={val => setEmail(val)}
                        />
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleUpdateEmail} >
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Send Code</Text>
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter confirmation code
                    </Text>

                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder='- - - - - -'
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={6}
                            onChangeText={val => setConfirmCode(val)}
                        />
                    </View>   

                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleConfirmCode} >
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

{/* //Update about me blurb */}
            <Modal visible={visible5} onDismiss={hideBioModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Update Bio
                    </Text>
                    <View style={{ marginTop: 10, borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <View style={styles.statuscontainermodal }> 
                            <TextInput 
                                placeholder={user?.bio || 'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={styles.textInput}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={val => setBio(val)}
                                defaultValue={user?.bio || ''}
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            onPress={handleUpdateBio}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                } 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>

{/* //Update Image modal */}
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={pickImage}>
                    <Image 
                        source={{ uri: image || user?.imageUri}} 
                        style={styles.modalavatar} 
                    />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Select a new profile image
                    </Text>
                    <View style={styles.button}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) : 
                                    <TouchableOpacity onPress={PublishAvatar}>
                                        <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                    </TouchableOpacity> 
                                }   
                            </View>
                    </View>
                </View>
            </Modal>

{/* //Sign Out modal */}
                <Modal visible={visible2} onDismiss={hideSignOutModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Are you sure you want to log out?
                        </Text>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={signOut}>
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#0000ff"/>
                                    ) : 
                                        <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Log Out</Text> 
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

{/* //Reset password modal */}
            <Modal visible={visible6} onDismiss={hidePassModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter new password
                    </Text>

                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>  
                        <TextInput
                            placeholder='Minimum 8 of characters'
                            placeholderTextColor='#00ffffa5'
                            style={styles.nametext}
                            maxLength={16}
                            onChangeText={val => setPassword(val)}
                            secureTextEntry={true}
                            //defaultValue={user?.name}
                        />
                    </View>

                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter old password
                    </Text>

                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>  
                        <TextInput
                            placeholder=''
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={16}
                            onChangeText={val => setOldPassword(val)}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleUpdatePassword}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#0000ff"/>
                                ) :
                                        <Text style={{color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>                               
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Portal>

{/* primary visible content */}
            <View>
                <View style={{  alignItems: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 20, marginHorizontal: 20,}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 40}}>
                        Edit Profile
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={showNameModal}>
                    <View style={styles.emailcontainer }> 
                        <Text style={ styles.words }>Name</Text>
                        <Text style={ styles.placeholdertext }>{user?.name}</Text>
                    </View>
                </TouchableWithoutFeedback>

                {user?.isPublisher === true ? (
                    <TouchableWithoutFeedback onPress={showPseudModal}>
                        <View style={styles.emailcontainer }> 
                            <Text style={ styles.words }>Pseudonym</Text>
                            <Text style={ styles.placeholdertext }>{user?.pseudonym || 'annonymous'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}
                   
                <TouchableWithoutFeedback onPress={showBioModal}>
                    <View style={styles.statuscontainer}> 
                        <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                            {user?.bio || 'Say something about yourself'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={styles.photocontainer }>
                        <Text style={ styles.words }>Photo</Text>
                        <Image 
                            source={user?.imageUri ? { uri: user?.imageUri} : require('../assets/images/blankprofile.png')} 
                            style={styles.avatar} 
                        />
                    </View>
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={showEmailModal}>
                    <View style={styles.emailcontainer }> 
                        <Text style={ styles.words }>Email</Text>
                        <Text style={ styles.placeholdertext }>{user?.email}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showPassModal}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Reset Password</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={showSignOutModal}>
                    <View style={styles.smallcontainer }>
                        <Text style={ styles.words }>Log Out</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <StatusBar style="light" />
        </View>            
    </Provider> 
);}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636a5',
        flex: 1,
        justifyContent: 'space-between',
    },
    photocontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    namecontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    statuscontainer: {
        backgroundColor: '#363636a5',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
        height: 140
    },
    statuscontainermodal: {
        backgroundColor: '#303030',
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
    },
    emailcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    smallcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    nametext: {
        fontSize: 16,
        color: '#00FFFF',
        textAlign: 'right',
    },
    placeholdertext: {
        fontSize: 16,
        color: '#ffffffa5',
        textAlign: 'right',
    },
    words: {
        fontSize: 16,
        marginVertical: 20,
        color: '#fff',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 16,
      },
      modalavatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        margin: 16,
        
      },
      textInput: {
        //flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#ffffffa5',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'cyan'
    },
    savewords: {
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 20,
        color: '#fff',
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 15,

    },
    deletecontainer: {
        margin: 50,
        alignItems: 'center',    
    },
    deletewords: {
        fontSize: 18,
        padding: 16,
        color: 'gray',
        //alignSelf: 'center',
    },
})