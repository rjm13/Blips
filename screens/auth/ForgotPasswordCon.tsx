import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Auth} from '@aws-amplify/auth'

//import {useNavigation} from '@react-navigation/native'
//import {Auth} from '@aws-amplify/auth'

const ForgotPassword = ({navigation, route} : {navigation : any, route : any}) => {

    const {email} = route.params

    const [updatePass, setUpdatePass] = useState({
        username: email,
        code: '',
        password: '',
        confirmPass: '',
    })

    const handleResetPassword = async () => {
        const {username, code, password, confirmPass} = updatePass;

        if(password === confirmPass) {

        try {
            console.log(username, code, password);
            let result = await Auth.forgotPasswordSubmit(username, code, password)

            console.log(result);

            if(result !== null) {
                navigation.navigate('SignIn');
            }
        } catch (e) {
            console.log(Error);
        }} else {
            alert('Passwords do not match')
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['cyan','#2f2179', '#000']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

<View style={{ margin: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirmation Code
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Check email for code'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                autoCapitalize='none'
                                onChangeText={val => setUpdatePass({...updatePass, code: val})}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 0, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            New Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                autoCapitalize='none'
                                onChangeText={val => setUpdatePass({...updatePass, password: val})}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 20, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirm New Password
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                autoCapitalize='none'
                                onChangeText={val => setUpdatePass({...updatePass, confirmPass: val})}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleResetPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Reset Password
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{fontSize: 14, color: '#fff', alignSelf: 'center', margin: 5}}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#363636a5',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
       alignItems: 'center',
       margin: 20,
    },
    buttontext: {
        backgroundColor: 'cyan',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
});

export default ForgotPassword;