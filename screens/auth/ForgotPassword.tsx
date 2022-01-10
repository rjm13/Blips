import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth, API, graphqlOperation } from 'aws-amplify';

const ForgotPassword = ({navigation} : any) => {

    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        Auth.forgotPassword(
            email,
        )
        .then(navigation.navigate('ForgotPasswordCon', {email: email}))
        .catch(err => console.log(err));
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
                            Email
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Send Reset Code
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 30}}>
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