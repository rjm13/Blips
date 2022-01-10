import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import AppLoading from 'expo-app-loading';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//import Navigation from '/Users/rjm/ShortStories/navigation';
import Navigation from './navigation'

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
Amplify.configure(config);
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

import { AppContext } from './AppContext';

import AudioPlayerWidget from './components/AudioPlayerWidget';
import AudioPlayerWidgetStatic from './components/AudioPlayerWidgetStatic';
import AudioPlayerAnimate from './components/AudioPlayerAnimate';
//import { IdentityStore } from 'aws-sdk';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [storyID, setStoryID] = useState<string|null>(null);

  const [userID, setUserID] = useState<string|null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      //get authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser(
        { bypassCache: true }
      )
      .catch(err=>err)
      //console.log(userInfo.attributes.sub);

      if (!userInfo) {
        setUserID(null)
        return;
      }

      if (userInfo) {
      //get the user from Backend with the user SUB from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser, 
            { id: userInfo.attributes.sub,
            }
          )
        )


        if (userData.data.getUser) {
          console.log(userData.data.getUser);
          setUserID(userData.data.getUser)
          return;
        } else {
          setUserID(null);
        }

        // const newUser = {
        //   id: userInfo.attributes.sub,
        //   name: userInfo.attributes.name,
        //   imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
        //   email: userInfo.attributes.email,
        //   status: '',
        // }

      //if there is no user in DB with the id, then create one
        // await API.graphql(
        //   graphqlOperation(
        //     createUser,
        //     { input: newUser }
        //   )
        // )
      }
    }
    fetchUser();

  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
        <AppContext.Provider value={{
          storyID,
          setStoryID: (id: string) => setStoryID(id),
          // userID,
          // setUserID: (id: string) => setUserID(id),
          userID,
          setUserID: (user: {}) => setUserID(user),

        }}>
          <Navigation 
            //colorScheme={colorScheme}
            colorScheme='dark'/>
          <StatusBar style='light' backgroundColor='#0000004D'/>
          <AudioPlayerWidgetStatic />
          </AppContext.Provider>
      </SafeAreaProvider>

    );
  }
}
