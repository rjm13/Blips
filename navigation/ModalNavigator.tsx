import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import AudioPlayerTest from '../screens/AudioPlayerTest';

const AudioPlayer = createStackNavigator();

export default function ModalNavigator() {

    return (
        <AudioPlayer.Navigator
            mode='modal'
            headerMode='none'
            screenOptions={{ 
                //headerShown: false,
                      
        }}
        >
            <AudioPlayer.Screen
                name="AudioPlayerTest"
                component={AudioPlayerTest}
                options={{ 
                    cardStyle: {
                        opacity: 0.5, 
                        backgroundColor: 'transparent'
                    } , 
                    cardOverlayEnabled: true,
                }}
            />
        </AudioPlayer.Navigator>
      );
}

