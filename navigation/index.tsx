import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, {useState, useEffect, useRef, useContext} from 'react';
import { ColorSchemeName, Appearance } from 'react-native';
import { AppContext } from '../AppContext';

import RedirectScreen from '../screens/auth/RedirectScreen';

import RecordAudioScreen from '../screens/RecordAudioScreen';
import AudioPlayer from '../screens/AudioPlayer';
import UserScreen from '../screens/UserScreen';
import UploadAudio from '../screens/UploadAudio';
import SimpleAudioPlayer from '../screens/SimpleAudioPlayer';
import Terms from '../screens/Terms';

import SignUpScreen from '../screens/auth/SignUp';
import SignInScreen from '../screens/auth/SignIn';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ForgotPasswordConScreen from '../screens/auth/ForgotPasswordCon';
import ConfirmEmailScreen from '../screens/auth/ConfirmEmail';

import ModalNavigator from '../navigation/ModalNavigator';
import AudioPlayerWidgetStatic from '../components/AudioPlayerWidgetStatic';
import { useRoute } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';


import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';


//import {Auth} from '@aws-amplify/auth';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName }
  ) {

  const { userID } = useContext(AppContext);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //   const fetchUser = async () => {
    //     //get authenticated user from Auth
    //     const userInfo = await Auth.currentAuthenticatedUser(
    //       { bypassCache: true }
    //     );
    //     //console.log(userInfo.attributes.sub);
  
    //     if (!userInfo) {
    //       return;
    //     }
    //     if (userInfo) {
    //       setIsLoggedIn(true);
    //     }
    //   }
    //   fetchUser();
  
    // }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, 
    //cardStyle: {opacity: 1, backgroundColor: 'transparent'} , cardOverlayEnabled: false,
    }} initialRouteName="Redirect">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="RecordAudio" component={RecordAudioScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="UploadAudio" component={UploadAudio} options={{ title: 'Oops!' }} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ForgotPasswordCon" component={ForgotPasswordConScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SimpleAudioPlayer" component={SimpleAudioPlayer} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Terms" component={Terms} options={{ title: 'Oops!' }} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Redirect" component={RedirectScreen} />
      {/* <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ title: 'Oops!' }} /> */}

    </Stack.Navigator>
  );
}



const Drawer = createDrawerNavigator<RootStackParamList>();

function DrawerNavigator() {


  return (
    <Drawer.Navigator 
      screenOptions={{ }}
      drawerType='front'
      //initialRouteName='Redirect'
      overlayColor="transparent"
      drawerStyle={{ width: '80%', height: '50%'}}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
    >
      <Drawer.Screen name="Drawer" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
