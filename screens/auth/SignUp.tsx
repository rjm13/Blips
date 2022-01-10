import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableWithoutFeedback, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import {Auth, graphqlOperation, API} from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { createUser } from '../../src/graphql/mutations';

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

const SignUp = ({navigation} : any) => {

//date time picker
        const [date, setDate] = useState(new Date(1598051730000));
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        const todaysdate = new Date(1598051730000);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode : any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const [isErr, setIsErr] = useState(false);

    const [noMatch, setNoMatch] = useState(false);

    const [shortPass, setShortPass] = useState(false);

    const [userExist, setUserExist] = useState(false);

    const [seePass, setSeePass] = useState(false);

    const [seeConPass, setSeeConPass] = useState(false);

    const [signingUp, setSigningUp] = useState(false);

    const [data, setData] = useState({
        username: '',
        password: '',
        name: '',
        birthdate: format(date, "MM/dd/yyyy"),
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

const CreateUser = async () => {

    const { password, confirm_password, name, username, birthdate } = data;

    setSigningUp(true);

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    name,
                    birthdate,
                }
            });
            console.log(user);

            if (user) {
                navigation.navigate('ConfirmEmail', {username, password})
            }
        } catch (error) {
            console.log('error signing up:', error);
            error.code === 'UsernameExistsException' ? setUserExist(true) : setIsErr(true)
        }
        setSigningUp(false);
}

    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ... data,
                name: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val : any) => {
        setData({
            ... data,
            confirm_password: val
        });
    }

    const handleConfirmPasswordChange = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleNameChange = (val : any) => {
        setData({
            ... data,
            name: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ... data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ... data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const handleSignUp = () => {

        const { password, confirm_password, name, username, dob } = data;

        if (password.length < 6) {
            setNoMatch(false);
            setIsErr(false);
            setShortPass(true);
            setUserExist(false);
            return;
        }

        if (password !== confirm_password && password.length > 5) {
            setShortPass(false);
            setIsErr(false);
            setNoMatch(true);
            setUserExist(false);
            return;
        }
        // Make sure passwords match
        if (password === confirm_password && password.length > 5) {
            setSigningUp(true);
            setShortPass(false);
            setNoMatch(false);
            CreateUser()
        } else {
            setIsErr(true);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['cyan','#2f2179', '#000']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ margin: 20, paddingTop: 70}}>
                    {userExist ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                                <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                    User already exists. Please log in.
                                </Text>
                            </View>
                        ) : null}
                    {isErr ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Error signing up. Please try again.
                            </Text>
                        </View>
                    ) : null}
                    {noMatch ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Passwords do no match. Try again.
                            </Text>
                        </View>
                    ) : null}
                    {shortPass ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Password must be at least 6 characters.
                            </Text>
                        </View>
                    ) : null}
                    <View>
                        <Text style={styles.header}>
                            Name
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={(val) => handleNameChange(val)}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.header}>
                            Email
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

                    <View style={{marginTop: 0}}>
                        <Text style={styles.header}>
                            Birth Date
                        </Text>
                        <TouchableWithoutFeedback onPress={showDatepicker}>
                            <View style={styles.inputfield}>
                                <Text style={styles.textInputTitle}>
                                    {format(date, "MMMM do, yyyy") === format(todaysdate, "MMMM do, yyyy") ? '...' : format(date, "MMMM do, yyyy")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>

                    <View style={{ borderBottomWidth: 1, borderColor: '#ffffffa5', marginBottom: 10, marginTop: 20, marginHorizontal: 20}}>

                    </View>

                    <View>
                        <Text style={styles.header}>
                            Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={20}
                                autoCapitalize='none'
                                secureTextEntry={seePass === true ? true : false }
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <Feather 
                                name={seePass === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10}}
                                onPress={() => setSeePass(!seePass)}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.header}>
                            Confirm Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={20}
                                autoCapitalize='none'
                                secureTextEntry={seeConPass === true ? true : false }
                                onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                            <Feather 
                                name={seeConPass === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10}}
                                onPress={() => setSeeConPass(!seeConPass)}
                            />
                        </View>
                    </View>

                </View>

                <TouchableOpacity onPress={handleSignUp}>
                    <View style={styles.button}>
                        {signingUp === true ? (
                            <ActivityIndicator size="small" color="cyan"/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Create Account
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignIn') }>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 40}}>
                        I already have an account.
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'flex-start',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 4,
        marginTop: 10,
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

export default SignUp;